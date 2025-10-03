type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  release_date?: string;
};

type MovieResponse = {
  results: Movie[] | [];
};

export async function fetchTrendingMovies(): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  const data = (await res.json()) as MovieResponse;

  return Array.isArray(data.results) ? data.results : [];
}

export async function fetchMoviesByGenre(genreId: number): Promise<Movie[]> {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}&include_adult=false`
  );

  if (!res.ok) throw new Error("Failed to fetch movies");

  const data = (await res.json()) as MovieResponse;

  return Array.isArray(data.results) ? data.results : [];
}

export async function searchMovies(query: string): Promise<MovieResponse> {
  if (!query) return { results: [] };

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );

  if (!res.ok) throw new Error("Failed to search movies");

  const data = (await res.json()) as MovieResponse;
  return { results: Array.isArray(data.results) ? data.results : [] };
}
