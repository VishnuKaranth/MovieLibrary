import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '../Searchbar'

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input and button', () => {
    render(<SearchBar />)
    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })

  it('submits search on form submit', () => {
    const router = { push: jest.fn() }
    jest.spyOn(require('next/navigation'), 'useRouter').mockReturnValue(router)

    render(<SearchBar />)
    const form = screen.getByPlaceholderText('Search movies...').closest('form')!
    const input = screen.getByPlaceholderText('Search movies...')

    // Type in search
    fireEvent.change(input, { target: { value: 'test query' } })

    // Submit form
    fireEvent.submit(form)

    // Verify navigation
    expect(router.push).toHaveBeenCalledWith('/search?query=test%20query')
  })
})