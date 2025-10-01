'use client';

import React, { useMemo } from 'react';

interface MovieCardProps {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  releaseDate?: string;
  actionType?: 'add' | 'remove';
  onAction?: () => void;
  isInWatchlist?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  title,
  overview,
  posterPath,
  releaseDate,
  actionType = 'add',
  onAction,
  isInWatchlist = false,
}) => {
  const imageUrl = useMemo(() => `https://image.tmdb.org/t/p/w500${posterPath}`, [posterPath]);

  // Button classes
  const addBtnClasses = isInWatchlist
    ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
    : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500';
  
  return (
    <div className="min-h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300 w-56 sm:w-52 md:w-56 mx-auto cursor-pointer">
      
      <img
        src={imageUrl}
        loading="lazy"
        alt={title}
        className="w-full h-80 sm:h-72 md:h-80 object-cover brightness-90 hover:brightness-100 transition duration-300"
      />

      <div className="p-4 flex flex-col gap-2">
        <h3
          className="text-lg font-bold text-white truncate"
          title={title}
        >
          {title}
        </h3>

        <p
          className="text-gray-400 text-sm line-clamp-3"
          title={overview}
        >
          {overview || 'No description available.'}
        </p>

        {releaseDate && (
          <p className="text-xs text-gray-500">Release: {releaseDate}</p>
        )}

        {actionType === 'add' && (
          <button
            onClick={onAction}
            disabled={isInWatchlist}
            aria-disabled={isInWatchlist}
            className={`w-full px-3 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 transition ${addBtnClasses}`}
          >
            {isInWatchlist ? 'Added' : 'Add to Watchlist'}
          </button>
        )}

        {actionType === 'remove' && (
          <button
            onClick={onAction}
            className="w-full px-3 py-2 bg-red-600 rounded-md text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Remove from Watchlist
          </button>
        )}
      </div>
    </div>
  );
};
