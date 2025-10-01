'use client';

import { useSearchParams } from "next/navigation";
import { MovieCard } from "~/components/moviecard/MovieCard";
import { useWatchlist, type Movie } from "~/hooks/WatchlistContext";
import { useSearchMovies } from "~/hooks/useSearchMovies";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const { movies, loading, error } = useSearchMovies(query);
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  if (!query) return <div className="p-8 text-gray-400">Please enter a search query.</div>;

  return (
    <main className="p-6 pt-32 bg-gray-950 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-white">
        Search results for: <span className="text-indigo-500">{query}</span>
      </h1>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array<number>(8)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-800 animate-pulse rounded-lg"></div>
          ))}
        </div>
      )}

      {error && <div className="p-8 text-red-500">{error}</div>}

      {!loading && !error && movies.length === 0 && (
        <div className="p-8 text-gray-400">No movies found for &quot;{query}&quot;</div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie: Movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              posterPath={movie.poster_path ?? ""}
              releaseDate={movie.release_date}
              actionType="add"
              onAction={() => addToWatchlist(movie)}
              isInWatchlist={isInWatchlist(movie.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
}
