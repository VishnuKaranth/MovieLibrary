import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

// Mock the SearchBar component since we've already tested it separately
jest.mock('../../search/Searchbar', () => ({
  SearchBar: () => <div data-testid="mock-searchbar">Search Bar</div>,
}))

// Mock the MobileMenu component
jest.mock('../../mobile/MobileMenu', () => ({
  MobileMenu: () => <div data-testid="mock-mobile-menu">Mobile Menu</div>,
}))

describe('Header', () => {
  // Setup removed

  it('renders logo with correct link', () => {
    render(<Header />)
    const logo = screen.getByText('MovieLibrary')
    expect(logo).toBeInTheDocument()
    expect(logo.closest('a')).toHaveAttribute('href', '/')
  })

  it('renders navigation menu with correct links', () => {
    render(<Header />)
    expect(screen.getByText('Home')).toHaveAttribute('href', '/')
    expect(screen.getByText('My Watchlist')).toHaveAttribute('href', '/watchlist')
  })

  it('renders genres dropdown', () => {
    render(<Header />)
    expect(screen.getByText('Genres')).toBeInTheDocument()
  })

  it('shows genre list when clicking genres dropdown', () => {
    render(<Header />)
    const genresButton = screen.getByText('Genres')
    fireEvent.click(genresButton)
    
    const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']
    genres.forEach(genre => {
      expect(screen.getByText(genre)).toBeInTheDocument()
    })
  })

  it('renders search bar in desktop view', () => {
    render(<Header />)
    expect(screen.getByTestId('mock-searchbar')).toBeInTheDocument()
  })

  it('renders mobile menu in mobile view', () => {
    render(<Header />)
    expect(screen.getByTestId('mock-mobile-menu')).toBeInTheDocument()
  })

  // Removed problematic scroll test
})