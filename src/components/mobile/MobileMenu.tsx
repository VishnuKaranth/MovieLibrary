"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-100">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-gray-900 text-gray-100">
        <div className="flex flex-col gap-4 mt-6">
          <Link href="/" className="hover:text-indigo-400">
            Home
          </Link>
          <Link href="/watchlist" className="hover:text-indigo-400">
            My Watchlist
          </Link>
          <div>
            <p className="font-semibold mb-2">Genres</p>
            <ul className="flex flex-col gap-1 pl-2">
              <li>
                <Link href="/genre/action" className="hover:text-indigo-400">
                  Action
                </Link>
              </li>
              <li>
                <Link href="/genre/comedy" className="hover:text-indigo-400">
                  Comedy
                </Link>
              </li>
              <li>
                <Link href="/genre/drama" className="hover:text-indigo-400">
                  Drama
                </Link>
              </li>
              <li>
                <Link href="/genre/horror" className="hover:text-indigo-400">
                  Horror
                </Link>
              </li>
              <li>
                <Link href="/genre/sci-fi" className="hover:text-indigo-400">
                  Sci-Fi
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
