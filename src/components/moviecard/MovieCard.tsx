'use client';

import React from 'react';

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  overview,
  posterPath,
  releaseDate,
}) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 w-56 mx-auto cursor-pointer">
    <img
      src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      alt={title}
      className="w-full h-80 object-cover brightness-90 hover:brightness-100 transition duration-300"
    />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2 text-white truncate" title={title}>
        {title}
      </h3>
      <p className="text-gray-400 text-sm line-clamp-3 mb-3" title={overview}>
        {overview || 'No description available.'}
      </p>
      {releaseDate && (
        <p className="text-xs text-gray-500 mb-4">Release: {releaseDate}</p>
      )}
      <button className="w-full px-3 py-2 bg-indigo-600 rounded-md text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition">
        Add to Watchlist
      </button>
    </div>
  </div>
);
