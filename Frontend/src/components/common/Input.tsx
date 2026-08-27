import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, icon, className = '', id, ...props }) => {
  return (
    <div className="w-full !rounded-none">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative !rounded-none">
        {icon && (
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          className={`w-full ${icon ? 'pl-9' : 'px-3.5'} py-2.5 bg-gray-50/50 border border-gray-200 !rounded-none text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-[#0f382c] focus:bg-white transition ${className}`}
          {...props}
        />
      </div>
    </div>
  );
};