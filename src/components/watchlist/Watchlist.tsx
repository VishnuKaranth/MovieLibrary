'use client';

import React from "react";
import { MovieCard } from "../moviecard/MovieCard";
import { InboxIcon } from "@heroicons/react/24/outline";
import { useWatchlist, type Movie } from "~/hooks/WatchlistContext";

const EmptyWatchlist: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
    <InboxIcon className="w-20 h-20 text-gray-500 mb-6" />
    <p className="text-lg font-semibold mb-1">Your watchlist is empty</p>
    <p className="text-sm text-gray-500 text-center max-w-xs">
      Browse movies and add your favorites to your watchlist!
    </p>
  </div>
);

const WatchlistGrid: React.FC<{
  movies: Movie[];
  onRemove: (id: number) => void;
}> = ({ movies, onRemove }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        posterPath={movie.poster_path || ""}
        releaseDate={movie.release_date}
        actionType="remove"
        onAction={() => onRemove(movie.id)}
      />
    ))}
  </div>
);

export default function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <main className="min-h-screen bg-gray-950 pt-24 px-4 sm:px-8 md:px-12 pb-24">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg">
        My Watchlist
      </h1>

      {watchlist.length === 0 ? (
        <EmptyWatchlist />
      ) : (
        <WatchlistGrid movies={watchlist} onRemove={removeFromWatchlist} />
      )}
    </main>
  );
}
