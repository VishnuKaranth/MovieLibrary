'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { MovieCard } from '../moviecard/MovieCard';
import { fetchMoviesByGenre } from '~/lib/tmdb';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWatchlist, type Movie } from '~/hooks/WatchlistContext';

const COMEDY_GENRE_ID = 35;

// OOP: Encapsulate movie fetching logic
class MovieService {
  static async getMoviesByGenre(genreId: number): Promise<Movie[]> {
    try {
      const movies: Movie[] = await fetchMoviesByGenre(genreId);
      return movies;
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      return [];
    }
  }
}

// Component for a single movie slide
const MovieSlide: React.FC<{
  movie: Movie;
  addToWatchlist: (movie: Movie) => void;
  isAdded: boolean;
}> = ({ movie, addToWatchlist, isAdded }) => (
  <div className="flex-shrink-0 w-[90%] sm:w-56 md:w-60 lg:w-64">
    <MovieCard
      id={movie.id}
      title={movie.title}
      overview={movie.overview}
      posterPath={movie.poster_path ?? ''}
      releaseDate={movie.release_date}
      actionType="add"
      onAction={() => addToWatchlist(movie)}
      isInWatchlist={isAdded}
    />
  </div>
);

export default function ComedyMoviesSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { addToWatchlist, isInWatchlist } = useWatchlist();

  const [emblaRef, embla] = useEmblaCarousel({ loop: true, skipSnaps: false, align: 'start' });

  // Fetch movies
  const loadMovies = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const fetchedMovies = await MovieService.getMoviesByGenre(COMEDY_GENRE_ID);
      setMovies(fetchedMovies);
    } catch {
      setError('Failed to load movies.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadMovies(); }, [loadMovies]);

  // Autoplay
  useEffect(() => {
    if (!embla) return;
    const autoplay = setInterval(() => embla.scrollNext(), 3000);
    return () => clearInterval(autoplay);
  }, [embla]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  // Conditional rendering
  if (loading) return <div className="text-center text-gray-400 text-lg py-20">Loading movies...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-20">{error}</div>;
  if (!movies.length) return <div className="text-center text-gray-400 text-lg py-20">No movies found</div>;

  return (
    <section className="relative py-8 bg-gray-950" id="comedy">
      <h2 className="text-3xl font-extrabold mb-6 px-6 sm:px-12 text-white tracking-wide drop-shadow-lg">
        <div className="inline-block transform -skew-x-12 bg-orange-500 px-4 py-1">Comedy Movies</div>
      </h2>

      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-5">
          {movies.map((movie) => (
            <MovieSlide
              key={movie.id}
              movie={movie}
              addToWatchlist={addToWatchlist}
              isAdded={isInWatchlist(movie.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Button
          variant="ghost"
          onClick={scrollPrev}
          className="bg-black/60 hover:bg-black/80 p-3 rounded-full shadow-lg"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </Button>
        <Button
          variant="ghost"
          onClick={scrollNext}
          className="bg-black/60 hover:bg-black/80 p-3 rounded-full shadow-lg"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </Button>
      </div>
    </section>
  );
}
