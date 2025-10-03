import { render, screen } from '@testing-library/react'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders branding and tagline', () => {
    render(<Footer />)
    expect(screen.getByText('MovieLibrary')).toBeInTheDocument()
    expect(screen.getByText(/Discover your favorite movies/)).toBeInTheDocument()
  })

  it('renders all social links', () => {
    render(<Footer />)

    const socialLinks = [
      'https://www.linkedin.com/in/vishnu-karanth-3ba772229',
      'https://github.com/vishnukaranth/',
      'mailto:vishnukaranth04@gmail.com'
    ]

    const allLinks = screen.getAllByRole('link')
    const socialLinksInDoc = allLinks.filter(link => socialLinks.includes(link.getAttribute('href') ?? ''))
    expect(socialLinksInDoc).toHaveLength(socialLinks.length)
  })

  it('renders quick links section', () => {
    render(<Footer />)
    const quickLinks = ['Home', 'About Me', 'Contact']
    
    quickLinks.forEach(linkText => {
      expect(screen.getByText(linkText)).toBeInTheDocument()
    })
  })

  it('renders contact section', () => {
    render(<Footer />)
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: '📧 Send me an Email' })).toBeInTheDocument()
  })

  it('renders footer credits', () => {
    render(<Footer />)
    expect(screen.getByText(/Built with ❤️ by Vishnu/)).toBeInTheDocument()
  })

  it('all links have correct attributes', () => {
    render(<Footer />)
    const externalLinks = screen.getAllByRole('link', { name: '' })
    
    externalLinks.forEach(link => {
      if (link.getAttribute('href')?.startsWith('http')) {
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
      }
    })
  })
})