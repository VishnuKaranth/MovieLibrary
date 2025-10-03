'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { searchMovies } from '~/lib/tmdb';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { type Movie } from '~/hooks/WatchlistContext';


function useDebounce<T extends (...args: never[]) => void>(callback: T,delay: number,dependencies: unknown[]) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(), delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  
  }, dependencies);
}


export function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const dropdownRef = useRef<HTMLUListElement>(null);
  const router = useRouter();


  const fetchSuggestions = useCallback(async () => {
    const searchText = query.trim();
    if (searchText.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
      
    }
    try {
      const data = await searchMovies(searchText);
      setSuggestions(data.results?.slice(0, 5) || []);
      setShowSuggestions(true);
      setHighlightIndex(-1);
      
    } catch (err) {
      console.error(err);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);


  useDebounce(() => { 
    void fetchSuggestions(); },
   300, [query, fetchSuggestions]);


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((prev) => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        break;
      case 'Enter': {
        e.preventDefault();
        const selected = suggestions[highlightIndex] ?? suggestions[0];
        const finalQuery = selected?.title ?? query;
        setQuery(finalQuery);
        setShowSuggestions(false);
        router.push(`/search?query=${encodeURIComponent(finalQuery)}`);
        break;
      }
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setShowSuggestions(false);
        
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectSuggestion = (movie: Movie) => {
    setQuery(movie.title);
    setShowSuggestions(false);
    router.push(`/search?query=${encodeURIComponent(movie.title)}`);
    
  };

  return (
    <div className="relative w-full max-w-md scrollbar-none">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!query.trim()) return;
          router.push(`/search?query=${encodeURIComponent(query)}`);
          setShowSuggestions(false);
          
        }}
        className="flex w-full"
      >
        <Input
          placeholder="Search movies..."
          value={query}
          
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          className="flex-1 bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <Button
          type="submit"
          className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Search
        </Button>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full max-h-72 overflow-auto bg-gray-900 rounded-lg shadow-lg scrollbar-thin scrollbar-thumb-gray-700"
        >
          {suggestions.map((movie, i) => (
            <li
              key={movie.id}
              className={`flex items-center gap-3 p-2 cursor-pointer ${
                highlightIndex === i ? 'bg-indigo-600' : 'hover:bg-gray-700'
              }`}
              onClick={() => selectSuggestion(movie)}
            >
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-16 flex items-center justify-center bg-gray-700 text-xs text-gray-400 rounded-md">
                  No Image
                </div>
              )}
              <span className="text-white truncate">{movie.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
