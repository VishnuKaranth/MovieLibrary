import { render, screen, fireEvent, act } from '@testing-library/react'
import ActionMoviesSection from '../ActionMoviesSection'
import { fetchMoviesByGenre } from '~/lib/tmdb'
import { useWatchlist } from '~/hooks/WatchlistContext'

// Mock the dependencies
jest.mock('~/lib/tmdb')
jest.mock('embla-carousel-react', () => () => [jest.fn(), { scrollNext: jest.fn(), scrollPrev: jest.fn() }])
jest.mock('~/hooks/WatchlistContext')
jest.mock('../../moviecard/MovieCard', () => ({
  MovieCard: ({ title, onAction }: { title: string; onAction: () => void }) => (
    <div data-testid="movie-card" onClick={onAction}>{title}</div>
  ),
}))

const mockMovies = [
  {
    id: 1,
    title: 'Test Action Movie 1',
    overview: 'Test overview 1',
    poster_path: '/test1.jpg',
    release_date: '2024-01-01',
  },
  {
    id: 2,
    title: 'Test Action Movie 2',
    overview: 'Test overview 2',
    poster_path: '/test2.jpg',
    release_date: '2024-01-02',
  },
]

describe('ActionMoviesSection', () => {
  beforeEach(() => {
    // Mock the Watchlist context
    ;(useWatchlist as jest.Mock).mockReturnValue({
      addToWatchlist: jest.fn(),
      isInWatchlist: jest.fn().mockReturnValue(false),
    })

    // Mock the API call
    ;(fetchMoviesByGenre as jest.Mock).mockResolvedValue(mockMovies)
  })

  it('renders loading state initially', () => {
    render(<ActionMoviesSection />)
    expect(screen.getByText('Loading movies...')).toBeInTheDocument()
  })

  it('renders movies after loading', async () => {
    await act(async () => {
      render(<ActionMoviesSection />)
    })
    
    // Wait for movies to load
    await screen.findByText('Test Action Movie 1')
    await screen.findByText('Test Action Movie 2')

    expect(screen.getByText('Action Movies')).toBeInTheDocument()
  })

  it('handles API error gracefully', async () => {
    // Mock API failure
    ;(fetchMoviesByGenre as jest.Mock).mockRejectedValue(new Error('API Error'))

    await act(async () => {
      render(<ActionMoviesSection />)
    })
    
    // Wait for error message
    await screen.findByText('No movies found')
  })

  it('renders navigation buttons', async () => {
    await act(async () => {
      render(<ActionMoviesSection />)
    })
    
    // Wait for content to load
    await screen.findByText('Test Action Movie 1')

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2) // Previous and Next buttons
  })

  it('allows adding movies to watchlist', async () => {
    const addToWatchlist = jest.fn()
    ;(useWatchlist as jest.Mock).mockReturnValue({
      addToWatchlist,
      isInWatchlist: () => false,
    })

    await act(async () => {
      render(<ActionMoviesSection />)
    })
    
    // Wait for movies to load
    await screen.findByText('Test Action Movie 1')

    // Click on the first movie card
    await act(async () => {
      fireEvent.click(screen.getByText('Test Action Movie 1'))
    })

    expect(addToWatchlist).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      title: 'Test Action Movie 1',
    }))
  })

  it('shows empty state when no movies are found', async () => {
    // Mock empty response
    ;(fetchMoviesByGenre as jest.Mock).mockResolvedValue([])

    await act(async () => {
      render(<ActionMoviesSection />)
    })
    
    // Wait for empty state message
    await screen.findByText('No movies found')
  })

  // Clean up timers after each test
  afterEach(() => {
    jest.clearAllTimers()
  })
})