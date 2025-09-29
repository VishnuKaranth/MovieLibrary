"use client";

import React, { useEffect, useState } from "react";
import { MovieCard } from "../moviecard/MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date?: string;
}

const WATCHLIST_STORAGE_KEY = "movieLibraryWatchlist";

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const removeFromWatchlist = (id: number) => {
    const updatedList = watchlist.filter(movie => movie.id !== id);
    setWatchlist(updatedList);
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(updatedList));
  };

  if (loading) {
    return <div className="p-6 text-gray-400">Loading watchlist...</div>;
  }

  if (watchlist.length === 0) {
    return (
      <div className="p-6 text-gray-400 text-center">
        Your watchlist is empty. Start adding some movies!
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {watchlist.map(movie => (
          <div key={movie.id} className="relative group">
            <MovieCard
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              posterPath={movie.poster_path}
              releaseDate={movie.release_date}
            />
            <button
              onClick={() => removeFromWatchlist(movie.id)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition"
              aria-label={`Remove ${movie.title} from watchlist`}
              title="Remove"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
