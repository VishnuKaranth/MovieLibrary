'use client';

import { useState, useEffect, useRef } from "react";
import { searchMovies } from "~/lib/tmdb";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function SearchBar() {
  /*** State as object properties ***/
  const [search, setSearch] = useState(""); // current search text
  const [suggestions, setSuggestions] = useState<any[]>([]); // list of suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // whether dropdown is visible
  const [highlightIndex, setHighlightIndex] = useState(-1); // index of highlighted item

  const dropdownRef = useRef<HTMLUListElement>(null); // reference to dropdown
  const debounceRef = useRef<NodeJS.Timeout | null>(null); // reference to debounce timer

  /*** Encapsulated methods (like class methods) ***/

  // Method to fetch suggestions from API
  const fetchSuggestions = async (query: string) => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      setHighlightIndex(-1);
      return;
    }

    try {
      const data = await searchMovies(query);
      const results = data?.results?.slice(0, 5) || [];
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
      setHighlightIndex(-1);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(search), 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [search]);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setShowSuggestions(false);
        setHighlightIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Method to submit search
  const submitSearch = (query: string) => {
    if (!query.trim()) return;
    alert(`Search submitted: ${query}`);
    setShowSuggestions(false);
  };

  // Method to handle suggestion click
  const selectSuggestion = (title: string) => {
    setSearch(title);
    setShowSuggestions(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" && highlightIndex >= 0) {
      e.preventDefault();
      selectSuggestion(suggestions[highlightIndex].title);
    }
  };

  /*** Render methods (like class render) ***/
  const renderSuggestionItem = (movie: any, index: number) => (
    <li
      key={movie.id}
      onClick={() => selectSuggestion(movie.title)}
      className={`
        flex items-center gap-3 p-2 cursor-pointer transition transform rounded-md
        ${highlightIndex === index ? "bg-indigo-600 scale-105" : "hover:bg-gray-700"}
      `}
    >
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
          alt={movie.title}
          className="w-16 h-24 rounded-md object-cover flex-shrink-0"
        />
      ) : (
        <div className="w-16 h-24 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-md text-xs text-gray-400">
          No Image
        </div>
      )}
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-white font-medium truncate">{movie.title}</span>
        <span className="text-gray-400 text-sm truncate">{movie.release_date}</span>
      </div>
    </li>
  );

  /*** Main JSX render ***/
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submitSearch(search);
      }}
      className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full max-w-md"
    >
      <Input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
        onKeyDown={handleKeyDown}
        className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
      />
      <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white w-full sm:w-auto">
        Search
      </Button>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          className="absolute top-full mt-2 left-0 right-0 max-h-80 overflow-auto bg-gray-900 rounded-lg shadow-xl scrollbar-none z-50"
        >
          {suggestions.map(renderSuggestionItem)}
        </ul>
      )}
    </form>
  );
}
