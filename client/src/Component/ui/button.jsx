
import React from "react";
import clsx from "clsx";

export const Button = React.forwardRef(
  ({ className = "", type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
