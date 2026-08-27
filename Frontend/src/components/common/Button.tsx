import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ children, icon, className = '', ...props }) => {
  return (
    <button
      className={`w-full py-3 bg-[#0f382c] hover:bg-[#0b2920] text-white font-medium text-xs !rounded-none active:scale-[0.99] transition duration-200 flex items-center justify-center space-x-2 ${className}`}
      {...props}
    >
      <span>{children}</span>
      {icon && <span>{icon}</span>}
    </button>
  );
};