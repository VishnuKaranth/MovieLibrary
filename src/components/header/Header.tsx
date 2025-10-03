"use client";

import React, { useCallback, useMemo } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "../ui/navigation-menu";
import { SearchBar } from "../search/Searchbar";
import { MobileMenu } from "../mobile/MobileMenu";

// ================= Logo =================
const Logo = React.memo(() => (
  <Link
    href="/"
    className="text-xl font-bold hover:text-indigo-400 transition-colors"
  >
    <div className="inline-block transform -skew-x-12 bg-gradient-to-r from-red-500 via-pink-500 to-yellow-400 px-6 py-2 shadow-lg">
      MovieLibrary
    </div>
  </Link>
));
Logo.displayName = "Logo";

// ================= Genre Dropdown =================
const GenreDropdown = React.memo(() => {
  const genres = useMemo(
    () => [
      { id: "action", label: "Action" },
      { id: "comedy", label: "Comedy" },
      { id: "drama", label: "Drama" },
      { id: "horror", label: "Horror" },
      { id: "scifi", label: "Sci-Fi" },
    ],
    []
  );

  const handleScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <NavigationMenuTrigger className="hover:text-indigo-400 transition-colors bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-md">
        Genres
      </NavigationMenuTrigger>
      <NavigationMenuContent className="p-4 bg-gray-800/70 backdrop-blur-md rounded-md">
        <ul className="grid gap-2 text-gray-100">
          {genres.map((genre) => (
            <li key={genre.id}>
              <button
                onClick={() => handleScroll(genre.id)}
                className="hover:text-indigo-400 text-left w-full focus:outline-none"
              >
                {genre.label}
              </button>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </>
  );
});
GenreDropdown.displayName = "GenreDropdown";

// ================= Navigation Menu =================
const NavMenu = React.memo(() => {
  const menuLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/watchlist", label: "My Watchlist" },
    ],
    []
  );

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList className="flex gap-4">
        {menuLinks.map((link) => (
          <NavigationMenuItem key={link.label}>
            <NavigationMenuLink asChild>
              <Link
                href={link.href}
                className="hover:text-indigo-400 transition-colors"
              >
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        <NavigationMenuItem>
          <GenreDropdown />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
});
NavMenu.displayName = "NavMenu";

// ================= Search Section =================
const ProfileSection = React.memo(() => (
  <div className="hidden md:flex items-center gap-4">
    <SearchBar />
  </div>
));
ProfileSection.displayName = "ProfileSection";

// ================= Header =================
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/40 backdrop-blur-xl shadow-lg border-b border-gray-700">
  {/* Make this flex container full width */}
  <div className="w-full flex items-center justify-between h-16 px-4 md:px-8 text-gray-100">
    <div className="flex items-center gap-6">
      <Logo />
      <NavMenu />
    </div>

        <ProfileSection />

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
