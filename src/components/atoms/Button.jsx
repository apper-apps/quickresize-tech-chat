import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-lg hover:scale-[1.02] focus:ring-primary-500/25",
    secondary: "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 focus:ring-gray-500/25",
    success: "bg-gradient-success text-white hover:shadow-lg hover:scale-[1.02] focus:ring-success-500/25",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white focus:ring-primary-500/25"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;