import React from "react";
import clsx from "clsx";

/**
 * Reusable Button Component
 * Supports different variants and sizes.
 *
 * Usage:
 * <Button>Default</Button>
 * <Button variant="outline">Outline</Button>
 * <Button size="sm">Small Button</Button>
 */

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary", // "primary" | "outline" | "ghost"
  size = "md",         // "sm" | "md" | "lg"
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-[#2726CC] text-white hover:bg-[#1f25a5]",
    outline:
      "border border-[#2726CC] text-[#2726CC] hover:bg-[#2726CC] hover:text-white",
    ghost: "text-[#2726CC] hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
};

export default Button;
