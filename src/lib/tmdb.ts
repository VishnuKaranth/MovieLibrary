export async function fetchTrendingMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies");
  }

  return res.json();
}

export async function fetchMoviesByGenre(genreId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&with_genres=${genreId}`
  );
  if (!res.ok) throw new Error('Failed to fetch movies');
  return res.json();
}

export async function searchMovies(query: string) {
  if (!query) return { results: [] };
  const res = await fetch (
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error('Failed to search movies');
  return res.json();
  
}