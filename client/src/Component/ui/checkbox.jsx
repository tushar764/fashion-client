import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
// import { Check } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";

// ✅ Utility function (local version of `cn`)
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ✅ Checkbox Component
export function Checkbox({ className, checked, onCheckedChange, id, ...props }) {
  return (
    <CheckboxPrimitive.Root
      id={id}
      className={`
        peer h-4 w-4 shrink-0 rounded-sm border border-black 
        ring-offset-background focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-ring 
        focus-visible:ring-offset-2 disabled:cursor-not-allowed 
        disabled:opacity-50 data-[state=checked]:bg-black 
        data-[state=checked]:text-white ${className}
      `}
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

// ✅ Badge Component
export function Badge({ children, className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          default: "bg-primary text-primary-foreground",
          secondary: "bg-secondary text-secondary-foreground",
          success: "bg-green-500 text-white",
          warning: "bg-yellow-500 text-black",
          danger: "bg-red-500 text-white",
          outline: "border border-border text-foreground",
        }[variant] || "",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ✅ Dialog Exports
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 z-50" />
      <DialogPrimitive.Content
        className={cn(
          "fixed z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg duration-200 rounded-xl top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 text-gray-500 hover:text-gray-900">
          <X className="h-5 w-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center", className)} {...props} />;
}

export function DialogFooter({ className, ...props }) {
  return <div className={cn("flex justify-end space-x-2", className)} {...props} />;
}

export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
