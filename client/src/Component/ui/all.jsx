import React, { createContext, useContext, useState, forwardRef } from 'react';
import { toast as sonnerToast } from "sonner"; // or your preferred toast lib
export const Label = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`font-medium ${className}`}>
    {children}
  </label>
);


// Changes
const Input = forwardRef(({ name, type = "text", placeholder, value, onChange, className = "" }, ref) => {
  return (
    <input
      ref={ref}
      className={`border p-2 rounded w-full ${className}`}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
});

export { Input };






export const Textarea = ({ name, placeholder, value, onChange }) => (
  <textarea
    className="border p-2 rounded w-full"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);



// ✅ Context to share state between Select components
const SelectContext = createContext();

export function Select({ children, value, onValueChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children, className }) {
  const { setIsOpen, isOpen } = useContext(SelectContext);
  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      className={`border p-2 rounded w-full text-left ${className}`}
    >
      {children}
    </button>
  );
}

// Card content

// Simple cn utility for combining class names
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-2xl border bg-white text-black shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";


const CardHeader = forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children ?? "Title"} {/* Ensures heading always has content for a11y */}
  </h3>
));
CardTitle.displayName = "CardTitle";

// ✅ Add CardFooter component
const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardContent, CardFooter,CardHeader,CardTitle };


export function SelectValue({ placeholder }) {
  const { value } = useContext(SelectContext);
  return <span>{value || placeholder}</span>;
}

export function SelectContent({ children, className }) {
  const { isOpen } = useContext(SelectContext);

  if (!isOpen) return null;

  return (
    <div className={`absolute bg-white border mt-1 rounded w-full shadow-md z-50 ${className}`}>
      {children}
    </div>
  );
}

// Toast code



export function useToast() {
  return sonnerToast;
}

export function SelectItem({ value, children }) {
  const { onValueChange, setIsOpen } = useContext(SelectContext);

  return (
    <div
      className="p-2 hover:bg-gray-200 cursor-pointer"
      onClick={() => {
        onValueChange(value);
        setIsOpen(false);
      }}
    >
      {children}
    </div>
  );
}

// Drop down menu


