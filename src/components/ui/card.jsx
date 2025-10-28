import React from "react";
import clsx from "clsx";

/**
 * Simple reusable Card component with Tailwind styling.
 * Includes Card and CardContent exports.
 */

export function Card({ className, children, ...props }) {
  return (
    <div
      className={clsx(
        "rounded-2xl shadow-md bg-white border border-gray-200 overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div
      className={clsx("p-4 sm:p-6 md:p-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
