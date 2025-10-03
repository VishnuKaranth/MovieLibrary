'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
}

const WATCHLIST_STORAGE_KEY = "movieLibraryWatchlist";

// --- OOP: WatchlistManager class ---
class WatchlistManager {
  private watchlist: Movie[] = [];

  constructor(initial: Movie[] = []) {
    this.watchlist = initial;
  }

  getAll() {
    return this.watchlist;
  }

  add(movie: Movie) {
    if (this.isInWatchlist(movie.id)) {
      toast.error(`"${movie.title}" is already in your watchlist.`);
      return false;
    }
    this.watchlist.push(movie);
    toast.success(`"${movie.title}" added to your watchlist!`);
    return true;
  }

  remove(id: number) {
    const movie = this.watchlist.find(m => m.id === id);
    if (!movie) return false;
    this.watchlist = this.watchlist.filter(m => m.id !== id);
    toast.success(`"${movie.title}" removed from watchlist.`);
    return true;
  }

  isInWatchlist(id: number) {
    return this.watchlist.some(m => m.id === id);
  }
}

// --- Context setup ---
interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

// --- Provider ---
export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const managerRef = React.useRef(new WatchlistManager());

  // Load from localStorage on mount
  useEffect(() => {
  if (typeof window === "undefined") return;
  const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
  let initial: Movie[] = [];
  try {
    initial = stored ? (JSON.parse(stored) as Movie[]) : [];
  } catch {
    initial = [];
  }
  managerRef.current = new WatchlistManager(initial);
  setWatchlist(managerRef.current.getAll());
}, []);


  // Persist to localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: Movie) => {
    if (managerRef.current.add(movie)) {
      setWatchlist([...managerRef.current.getAll()]);
    }
  };

  const removeFromWatchlist = (id: number) => {
    if (managerRef.current.remove(id)) {
      setWatchlist([...managerRef.current.getAll()]);
    }
  };

  const isInWatchlist = (id: number) => managerRef.current.isInWatchlist(id);

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

// --- Custom hook ---
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error("useWatchlist must be used within a WatchlistProvider");
  return context;
};
