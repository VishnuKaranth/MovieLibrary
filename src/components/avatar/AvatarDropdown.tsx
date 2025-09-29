"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-gray-700 text-gray-100">U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-gray-800 text-gray-100 border-gray-700">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="border-gray-700" />
        <DropdownMenuItem className="hover:bg-gray-700">Profile</DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700">Settings</DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
