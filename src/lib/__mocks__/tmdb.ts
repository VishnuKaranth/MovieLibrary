// Mock data
const mockMovies = [
  {
    id: 1,
    title: 'Test Movie 1',
    overview: 'Test overview 1',
    poster_path: '/test1.jpg',
    release_date: '2024-01-01',
  },
  {
    id: 2,
    title: 'Test Movie 2',
    overview: 'Test overview 2',
    poster_path: '/test2.jpg',
    release_date: '2024-01-02',
  },
]

export const fetchMoviesByGenre = jest.fn().mockResolvedValue(mockMovies)
export const searchMovies = jest.fn().mockResolvedValue({ results: mockMovies })
export const getMovieDetails = jest.fn().mockResolvedValue(mockMovies[0])