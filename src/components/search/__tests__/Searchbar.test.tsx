import { render, screen, fireEvent } from '@testing-library/react'
import { SearchBar } from '../Searchbar'
import * as nextNavigation from 'next/navigation'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

// Mock next/navigation initially
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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
    // Type-safe mock router
    const router: Partial<AppRouterInstance> = {
      push: jest.fn(),
    }

    jest.spyOn(nextNavigation, 'useRouter').mockReturnValue(router as AppRouterInstance)

    render(<SearchBar />)
    const form = screen.getByPlaceholderText('Search movies...').closest('form')!
    const input = screen.getByPlaceholderText('Search movies...')

    fireEvent.change(input, { target: { value: 'test query' } })
    fireEvent.submit(form)

    expect(router.push).toHaveBeenCalledWith('/search?query=test%20query')
  })
})
