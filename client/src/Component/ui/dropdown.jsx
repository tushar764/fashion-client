import React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Store/auth-slice/auth-slice";
import { User } from "lucide-react";

// Utility function
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// ✅ Exported Dropdown primitives
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuContent = ({ className, sideOffset = 4, ...props }) => (
  <DropdownMenuPrimitive.Content
    sideOffset={sideOffset}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-black shadow-md",
      "dark:border-neutral-800 dark:bg-neutral-950",
      className
    )}
    {...props}
  />
);
export const DropdownMenuItem = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Item
    className={cn(
      "flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded cursor-pointer",
      className
    )}
    {...props}
  />
);
export const DropdownMenuLabel = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Label
    className={cn(
      "px-2 py-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300",
      className
    )}
    {...props}
  />
);
export const DropdownMenuSeparator = ({ className, ...props }) => (
  <DropdownMenuPrimitive.Separator
    className={cn("my-1 h-px bg-neutral-200 dark:bg-neutral-800", className)}
    {...props}
  />
);

export const DropdownMenuRadioItem = ({ className, ...props }) => (
  <DropdownMenuPrimitive.RadioItem
    className={cn(
      "flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer rounded hover:bg-neutral-100 dark:hover:bg-neutral-800",
      className
    )}
    {...props}
  />
);
// ✅ Component using dropdown
export default function DropdownExample({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center cursor-pointer">
          <AvatarPrimitive.Root className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <AvatarPrimitive.Image
              className="h-full w-full object-cover"
              src={`https://github.com/${user?.userName}.png`}
              alt="GitHub Avatar"
            />
            <AvatarPrimitive.Fallback
              className="flex h-full w-full items-center justify-center text-sm font-medium text-neutral-600 dark:text-neutral-300"
              delayMs={600}
            >
              {user?.userName?.[0]?.toUpperCase() || "TS"}
            </AvatarPrimitive.Fallback>
          </AvatarPrimitive.Root>
          <span className="ml-2 text-sm font-medium">{user?.userName}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right">
        <DropdownMenuLabel>
          Logged in as {user?.userName}
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={() => navigate("/shop/account")}>
          <User className="w-4 h-4" />
          Account
        </DropdownMenuItem>

        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={onLogout}
          className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
