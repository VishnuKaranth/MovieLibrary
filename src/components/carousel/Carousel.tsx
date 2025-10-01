'use client';
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState, useCallback } from "react";
import { fetchTrendingMovies } from "~/lib/tmdb";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWatchlist, type Movie } from "~/hooks/WatchlistContext";

// Encapsulate Movie fetching logic
class MovieService {
  static async getTrendingMovies(): Promise<Movie[]> {
    try {
      const movies: Movie[] = await fetchTrendingMovies();
      return movies;
    } catch (error) {
      console.error('Failed to fetch movies:', error);
      return [];
    }
  }
}

// Single Movie Slide component
const MovieSlide: React.FC<{ movie: Movie; addToWatchlist: (movie: Movie) => void; isAdded: boolean; scrollPrev: () => void; scrollNext: () => void }> = ({ movie, addToWatchlist, isAdded, scrollPrev, scrollNext }) => (
  <div className="min-w-full h-full relative flex-shrink-0">
    <img
      src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      alt={movie.title}
      
      className="h-full w-full object-cover rounded-lg shadow-lg"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg"></div>
    
    <div className="absolute bottom-10 left-4 md:left-10 max-w-lg flex flex-col gap-4 rounded-lg bg-black/30 backdrop-blur-lg p-4 md:p-6">
      <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">{movie.title}</h2>
      <p className="text-gray-200 line-clamp-3 text-sm md:text-base">{movie.overview}</p>

      <button
        onClick={() => addToWatchlist(movie)}
        className={`px-4 py-2 rounded font-medium shadow-lg transition
          ${isAdded
            ? 'bg-gray-600 cursor-not-allowed text-gray-300'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        disabled={isAdded}
      >
        {isAdded ? 'Added' : 'Add to Watchlist'}
      </button>

      <div className="flex gap-3 mt-2 md:mt-4">
        <button
          onClick={scrollPrev}
          className="bg-black/50 hover:bg-black/70 p-2 md:p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
        <button
          onClick={scrollNext}
          className="bg-black/50 hover:bg-black/70 p-2 md:p-3 rounded-full shadow-lg flex items-center justify-center"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </button>
      </div>
    </div>
  </div>
);

export default function MovieCarousel() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [movies, setMovies] = useState<Movie[]>([]);
  const { addToWatchlist, isInWatchlist } = useWatchlist();

  // Fetch movies
  const loadMovies = useCallback(async () => {
    const trendingMovies = await MovieService.getTrendingMovies();
    setMovies(trendingMovies);
  }, []);

  useEffect(() => {
    void (async () => { await loadMovies(); }) ();
  }, [loadMovies]);

  // Autoplay
  useEffect(() => {
    if (!embla) return;
    const autoplay = setInterval(() => embla.scrollNext(), 4000);
    return () => clearInterval(autoplay);
  }, [embla]);

  const scrollPrev = () => embla?.scrollPrev();
  const scrollNext = () => embla?.scrollNext();

  return (
    <section className="w-full h-[80vh] md:h-screen overflow-hidden bg-gray-950">
      <div className="overflow-hidden h-full w-full" ref={emblaRef}>
        <div className="flex h-full">
          {movies.map((movie) => (
            <MovieSlide
              key={movie.id}
              movie={movie}
              addToWatchlist={addToWatchlist}
              isAdded={isInWatchlist(movie.id)}
              scrollPrev={scrollPrev}
              scrollNext={scrollNext}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
