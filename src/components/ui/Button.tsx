import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'danger';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', variant = 'primary' }) => {
  const baseStyle = 'px-4 py-2 rounded-md transition-colors';
  const variantStyles = variant === 'danger' 
    ? 'bg-red-500 text-white hover:bg-red-600' 
    : 'bg-blue-500 text-white hover:bg-blue-600';
  
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variantStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
