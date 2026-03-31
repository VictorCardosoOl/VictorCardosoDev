import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  size = 'md', 
  asChild,
  ...props 
}) => {
  
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-widest rounded-full transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-[0_8px_30px_rgb(15,23,42,0.12)] hover:shadow-[0_8px_30px_rgb(15,23,42,0.2)] hover:-translate-y-0.5",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md",
    outline: "border border-slate-200 text-slate-600 hover:border-slate-900 hover:text-slate-900 bg-transparent hover:bg-slate-50",
    ghost: "bg-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50"
  };

  const sizes = {
    sm: "text-[10px] px-4 py-2",
    md: "text-xs px-6 py-3.5",
    lg: "text-sm px-8 py-5"
  };

  const combinedClasses = twMerge(baseStyles, variants[variant], sizes[size], className);

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;