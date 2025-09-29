'use client';

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { fetchTrendingMovies } from "~/lib/tmdb";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

export default function MovieCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [movies, setMovies] = useState<Movie[]>([]);

  const loadMovies = useCallback(async () => {
    try {
      const data = await fetchTrendingMovies();
      setMovies(data.results || []);
    } catch (err) {
      console.error("Failed to fetch trending movies:", err);
    }
  }, []);

  const scrollNext = () => embla && embla.scrollNext();
  const scrollPrev = () => embla && embla.scrollPrev();

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  useEffect(() => {
    if (!embla) return;
    const autoplay = setInterval(() => embla.scrollNext(), 5000);
    return () => clearInterval(autoplay);
  }, [embla]);

  const renderMovieSlide = (movie: Movie) => (
    <div className="min-w-full h-full relative" key={movie.id}>
      {/* Movie backdrop */}
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="h-full w-full object-cover rounded-lg shadow-lg"
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div>

      {/* Glassy container for text */}
      <div className="absolute bottom-20 left-10 max-w-lg flex flex-col gap-4 rounded-lg bg-black/30 backdrop-blur-lg p-6">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">{movie.title}</h2>
        <p className="text-gray-200 line-clamp-3">{movie.overview}</p>
        <button className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 rounded font-medium shadow-lg transition">
          Add to Watchlist
        </button>

        {/* Arrows below button */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={scrollPrev}
            className="bg-black/50 hover:bg-black/70 p-3 rounded-full shadow-lg transition flex items-center justify-center"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={scrollNext}
            className="bg-black/50 hover:bg-black/70 p-3 rounded-full shadow-lg transition flex items-center justify-center"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <section className="relative h-screen w-full">
        <div className="overflow-hidden h-full w-full" ref={emblaRef}>
          <div className="flex h-full">
            {movies.map(renderMovieSlide)}
          </div>
        </div>
      </section>
    </div>
  );
}
