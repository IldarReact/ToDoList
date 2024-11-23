import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  writeBatch,
} from "firebase/firestore";
import { Task, KanbanTask } from '../store/types/Task';

const firebaseConfig = {
  apiKey: "AIzaSyDSUH1mJMz4e-SfC0StYXXbPAqQhCIGKuE",
  authDomain: "todolist-920bd.firebaseapp.com",
  projectId: "todolist-920bd",
  storageBucket: "todolist-920bd.firebasestorage.app",
  messagingSenderId: "833788876626",
  appId: "1:833788876626:web:2f19ce679e0287c2f1cc8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

type StatusType = 'todo' | 'inProgress' | 'done';

export const getTasks = async (): Promise<KanbanTask[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "kanbanTasks"));
    const tasks: KanbanTask[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      tasks.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        status: (data.status || 'todo') as StatusType,
        order: data.order || 0,
      });
    });
    return tasks.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const updateTaskOrderInFirebase = async (tasks: KanbanTask[]): Promise<void> => {
  try {
    const batch = writeBatch(db);

    const groupedTasks: Record<StatusType, KanbanTask[]> = {
      todo: [],
      inProgress: [],
      done: []
    };

    tasks.forEach((task) => {
      groupedTasks[task.status as StatusType].push(task);
    });

    Object.entries(groupedTasks).forEach(([, columnTasks]) => {
      columnTasks.forEach((task, index) => {
        const taskRef = doc(db, "kanbanTasks", task.id);
        batch.update(taskRef, { 
          order: index,
          status: task.status
        });
      });
    });

    await batch.commit();
  } catch (error) {
    console.error("Error updating task orders:", error);
    throw error;
  }
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const tasksSnapshot = await getDocs(collection(db, "tasks"));
    const tasks = tasksSnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    })) as Task[];
    
    const maxOrder = tasks.length > 0 
      ? Math.max(...tasks.map(t => t.order))
      : -1;
    
    const newTask = {
      ...task,
      order: maxOrder + 1
    };

    const docRef = await addDoc(collection(db, "tasks"), newTask);
    
    return {
      ...newTask,
      id: docRef.id
    };
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const addKanbanTask = async (task: Omit<KanbanTask, 'id'>): Promise<KanbanTask> => {
  try {
    const tasksSnapshot = await getDocs(collection(db, "kanbanTasks"));
    const existingTasks = tasksSnapshot.docs.filter(doc => doc.data().status === task.status);

    const newOrder = existingTasks.length;

    const docRef = await addDoc(collection(db, "kanbanTasks"), {
      title: task.title,
      description: task.description,
      status: (task.status || 'todo') as StatusType,
      order: newOrder,
      createdAt: new Date().toISOString()
    });

    return {
      id: docRef.id,
      title: task.title,
      description: task.description,
      status: (task.status || 'todo') as StatusType,
      order: newOrder,
    };
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTaskStatusInFirebase = async (taskId: string, status: StatusType): Promise<void> => {
  try {
    const taskRef = doc(db, "kanbanTasks", taskId);
    await updateDoc(taskRef, { status });
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error;
  }
};

export const deleteTask = async (taskId: string): Promise<void> => {
  try {
    const taskRef = doc(db, "kanbanTasks", taskId);
    await deleteDoc(taskRef);
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const reorderTasks = async (tasks: Task[]): Promise<void> => {
  const batch = writeBatch(db);
  
  tasks.forEach((task) => {
    const taskRef = doc(db, "tasks", task.id);
    batch.update(taskRef, { 
      order: task.order
    });
  });

  await batch.commit();
};

export const getNextOrder = async (collectionName: string): Promise<number> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  const tasks = querySnapshot.docs.map(doc => doc.data());
  const maxOrder = Math.max(...tasks.map(task => task.order || 0));
  return maxOrder + 1000;
};

export {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};