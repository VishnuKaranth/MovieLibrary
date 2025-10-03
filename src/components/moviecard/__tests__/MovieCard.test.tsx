import { render, screen } from '@testing-library/react'
import { MovieCard } from '../MovieCard'

describe('MovieCard', () => {
  const mockMovieProps = {
    id: 1,
    title: 'Test Movie',
    overview: 'Test movie description',
    posterPath: '/test-poster.jpg',
    releaseDate: '2024-01-01',
  }

  it('renders movie title correctly', () => {
    render(<MovieCard {...mockMovieProps} />)
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
  })

  it('renders movie overview correctly', () => {
    render(<MovieCard {...mockMovieProps} />)
    expect(screen.getByText('Test movie description')).toBeInTheDocument()
  })

  it('renders release date correctly', () => {
    render(<MovieCard {...mockMovieProps} />)
    expect(screen.getByText('Release: 2024-01-01')).toBeInTheDocument()
  })

  it('renders Add to Watchlist button by default', () => {
    render(<MovieCard {...mockMovieProps} />)
    expect(screen.getByText('Add to Watchlist')).toBeInTheDocument()
  })

  it('renders Remove from Watchlist button when actionType is remove', () => {
    render(<MovieCard {...mockMovieProps} actionType="remove" />)
    expect(screen.getByText('Remove from Watchlist')).toBeInTheDocument()
  })

  it('shows Added text when movie is in watchlist', () => {
    render(<MovieCard {...mockMovieProps} isInWatchlist={true} />)
    expect(screen.getByText('Added')).toBeInTheDocument()
  })
})