"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "../ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import React, { useMemo, useCallback } from "react";

// ================= Mobile Menu =================
export function MobileMenu() {
  // Main menu links
  const menuLinks = useMemo(
    () => [
      { href: "/", label: "Home" },
      { href: "/watchlist", label: "My Watchlist" },
    ],
    []
  );

  // Genre links
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

  // Smooth scroll handler
  const handleScroll = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <Sheet>
      {/* Trigger button */}
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-100">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Sheet (Drawer) Content */}
      <SheetContent side="left" className="w-64 bg-gray-900 text-gray-100">
        {/* Hidden title for accessibility */}
        <SheetTitle>
          <VisuallyHidden>Mobile Navigation Menu</VisuallyHidden>
        </SheetTitle>

        <div className="flex flex-col gap-4 mt-6">
          {/* Main Links */}
          {menuLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-indigo-400 transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Genre Links */}
          <div>
            <p className="font-semibold mb-2">Genres</p>
            <ul className="flex flex-col gap-1 pl-2">
              {genres.map((genre) => (
                <li key={genre.id}>
                  <button
                    onClick={() => handleScroll(genre.id)}
                    className="hover:text-indigo-400 transition-colors text-left w-full focus:outline-none"
                  >
                    {genre.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
