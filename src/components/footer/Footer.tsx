'use client';

import { Linkedin, Github, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/vishnu-karanth-3ba772229", color: "hover:text-blue-500" },
  { icon: Github, href: "https://github.com/vishnukaranth/", color: "hover:text-gray-300" },
  { icon: Mail, href: "mailto:vishnukaranth04@gmail.com", color: "hover:text-red-400" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  // { label: "Trending", href: "/trending" },
  // { label: "Genres", href: "/genres" },
  { label: "About Me", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6 mt-auto w-full">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10 md:gap-16">
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

        <div className="flex flex-col gap-4 max-w-sm md:flex-1">
          <h3 className="text-lg font-semibold">Contact Me</h3>
          <p className="text-gray-400">
            I'm a fresher and learning new things every day.  
            Feel free to reach out for opportunities or collaborations.
          </p>

          <a
            href="mailto:vishnukaranth04@gmail.com"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-medium transition text-center"
          >
            Send me an Email
          </a>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-gray-500 text-sm text-center">
        Built with ❤️ by Vishnu
      </div>
    </footer>
  );
}
