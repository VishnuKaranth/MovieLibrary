'use client';

import { useState, useEffect } from "react";
import { searchMovies } from "~/lib/tmdb";
import type { Movie } from "~/hooks/WatchlistContext";

export function useSearchMovies(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query);
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return { movies, loading, error: null };
}
