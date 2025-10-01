'use client';

import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com", color: "hover:text-indigo-500" },
  { icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-500" },
  { icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-500" },
  { icon: Github, href: "https://github.com", color: "hover:text-gray-300" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Trending", href: "/trending" },
  { label: "Genres", href: "/genres" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-16">

        {/* Branding & Social */}
        <div className="flex flex-col gap-4 md:flex-1">
          <h2 className="text-2xl font-bold tracking-wide">MovieLibrary</h2>
          <p className="text-gray-400 max-w-sm">
            Discover your favorite movies, track watchlists, and explore trending films with MovieLibrary.
          </p>
          <div className="flex gap-4 mt-2">
            {socialLinks.map(({ icon: Icon, href, color }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition ${color}`}
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-4 md:flex-1">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            {quickLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white transition">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4 max-w-sm md:flex-1">
          <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
          <p className="text-gray-400">Get updates about trending movies and new releases.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-gray-500 text-sm text-center">
        Built with ❤️ by Vishnu
      </div>
    </footer>
  );
}
