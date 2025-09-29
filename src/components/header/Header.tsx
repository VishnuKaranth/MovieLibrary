"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import { SearchBar } from "../searchbar/Searchbar";
import { AvatarDropdown } from "../avatar/AvatarDropdown";
import { MobileMenu } from "../mobile/MobileMenu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-gray-900/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-8 text-gray-100">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold hover:text-indigo-400 transition-colors">
  <div className="inline-block transform -skew-x-12 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 px-6 py-2 shadow-lg">
    MovieLibrary
  </div>
</Link>

          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="flex gap-4">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/watchlist" className="hover:text-indigo-400 transition-colors">My Watchlist</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:text-indigo-400 transition-colors bg-gray-800 hover:bg-gray-400">
                  Genres
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 bg-gray-800 rounded-md">
                  <ul className="grid gap-2 text-gray-100">
                    <li><Link href="/genre/action" className="hover:text-indigo-400">Action</Link></li>
                    <li><Link href="/genre/comedy" className="hover:text-indigo-400">Comedy</Link></li>
                    <li><Link href="/genre/drama" className="hover:text-indigo-400">Drama</Link></li>
                    <li><Link href="/genre/horror" className="hover:text-indigo-400">Horror</Link></li>
                    <li><Link href="/genre/sci-fi" className="hover:text-indigo-400">Sci-Fi</Link></li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search and Profile Section */}
        <div className="hidden md:flex items-center gap-4">
          <SearchBar />
          <AvatarDropdown />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
