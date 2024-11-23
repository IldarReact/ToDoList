# Todo & Kanban Application

A React-based task management application combining a Todo list and Kanban board for efficient task organization. Built with TypeScript, Redux Toolkit, and modern React practices.

## Features

### Todo List
- Create, edit, and delete tasks
- Mark tasks as complete/incomplete
- Drag-and-drop task reordering
- Delete confirmation dialog
- Real-time task status updates

### Kanban Board
- Create and organize tasks across different status columns
- Drag-and-drop tasks between status columns
- Delete tasks with ease
- Visual task status tracking

## Tech Stack

- React 18.3 with TypeScript
- Vite for build tooling
- Redux Toolkit for state management
- TailwindCSS for styling
- ESLint for code quality

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## Installation

1. Clone the repository
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add necessary environment variables
```env
VITE_API_KEY=your_api_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── Kanban/          # Kanban board components
│   │   └── ToDoList/        # Todo list components
│   ├── hooks/               # Custom React hooks
│   ├── store/              
│   │   └── slices/          # Redux slices
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   └── pages/               # Page components
```

## State Management

The application uses Redux Toolkit for state management with two main slices:

### Task Slice
- Manages todo list tasks
- Handles task ordering, completion status, and CRUD operations

### Kanban Task Slice
- Manages Kanban board tasks
- Handles task status changes and board organization

## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build

## Development

1. The project uses ESLint for code quality. Run linting with:
```bash
npm run lint
```

2. For development:
```bash
npm run dev
```

3. To build for production:
```bash
npm run build
```

## Customization

### Adding New Status Columns
To add new status columns to the Kanban board, modify the status types in `src/types/Task.ts`:

```typescript
export type KanbanTaskStatus = 'todo' | 'in-progress' | 'done' | 'your-new-status';
```

### Styling
The project uses shadcn/ui components and TailwindCSS for styling. Customize the theme in:
- `tailwind.config.js` for TailwindCSS configuration
- `components/ui` for shadcn/ui component customization

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details