'use client';

import React, { useEffect, useState, useRef } from 'react';
import { MovieCard } from '../moviecard/MovieCard';
import { fetchMoviesByGenre } from '~/lib/tmdb';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ACTION_GENRE_ID = 28;

export default function ActionMoviesSection() {
  /*** State as properties ***/
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  /*** Encapsulated methods ***/

  // Fetch movies
  const loadMovies = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchMoviesByGenre(ACTION_GENRE_ID);
      setMovies(Array.isArray(data.results) ? data.results : []);
    } catch (err) {
      console.error(err);
      setError('Failed to load movies.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll carousel
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = (scrollRef.current.firstChild as HTMLElement | null)?.clientWidth || 240;
    const gap = 20; // Tailwind space-x-5
    const scrollAmount = (cardWidth + gap) * 3; // scroll 3 cards
    scrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  // Render a single movie card
  const renderMovieCard = (movie: any) => (
    <div
      key={movie.id}
      className="flex-shrink-0 w-[90%] sm:w-56 md:w-60 lg:w-64 rounded-lg shadow-lg bg-gradient-to-br from-gray-800 to-gray-900 transition-transform hover:scale-105 hover:shadow-2xl"
    >
      <MovieCard
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        posterPath={movie.poster_path}
        releaseDate={movie.release_date}
      />
    </div>
  );

  /*** Lifecycle ***/
  useEffect(() => {
    loadMovies();
  }, []);

  /*** Main JSX render ***/
  return (
    <section className="relative py-8 bg-gray-900">
      <h2 className="text-3xl font-extrabold mb-6 px-6 sm:px-12 text-white tracking-wide drop-shadow-lg">
        <div className="inline-block transform -skew-x-12 bg-red-400 px-4 py-1">
        Action Movies
      </div></h2>

      {loading ? (
        <div className="text-center text-gray-400 text-lg py-20">Loading movies...</div>
      ) : error ? (
        <div className="text-center text-red-500 text-lg py-20">{error}</div>
      ) : movies.length === 0 ? (
        <div className="text-center text-gray-400 text-lg py-20">No movies found</div>
      ) : (
        <>
          {/* Left Arrow */}
          <Button
            onClick={() => scroll('left')}
            variant="ghost"
            aria-label="Scroll left"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 hover:bg-black/80 p-3 shadow-lg opacity-90 hover:opacity-100 transition"
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </Button>

          {/* Movies Container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-none space-x-5 px-6 sm:px-12 scroll-smooth"
          >
            {movies.map(renderMovieCard)}
          </div>

          {/* Right Arrow */}
          <Button
            onClick={() => scroll('right')}
            variant="ghost"
            aria-label="Scroll right"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 rounded-full bg-black/60 hover:bg-black/80 p-3 shadow-lg opacity-90 hover:opacity-100 transition"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </Button>

          {/* Gradient overlays */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-gray-900 to-transparent z-20" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-gray-900 to-transparent z-20" />
        </>
      )}
    </section>
  );
}
