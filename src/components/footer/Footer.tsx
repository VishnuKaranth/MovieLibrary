'use client';

import { Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">

        {/* Branding */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-wide">MovieLibrary</h2>
          <p className="text-gray-400 max-w-sm">
            Discover your favorite movies, track watchlists, and explore trending films with MovieLibrary.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-500">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/trending" className="hover:text-white transition">Trending</a></li>
            <li><a href="/genres" className="hover:text-white transition">Genres</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col gap-4 max-w-sm">
          <h3 className="text-lg font-semibold">Subscribe to Newsletter</h3>
          <p className="text-gray-400">Get updates about trending movies and new releases.</p>
          <form className="flex gap-2">
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
        &copy; {new Date().getFullYear()} MovieLibrary. All rights reserved. | Built with ❤️ by Vishnu
      </div>
    </footer>
  );
}
