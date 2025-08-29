'use client';

import React, { useState, useEffect } from 'react';
import { triviaService } from '@/utils/triviaService';
import { HorizontalSpacer } from './Icons';

export const TaylorTrivia = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('daily');
  const [dailyTrivia, setDailyTrivia] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [songMeanings, setSongMeanings] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    if (isOpen) {
      loadTriviaData();
    }
  }, [isOpen]);

  const loadTriviaData = () => {
    const trivia = triviaService.getDailyTrivia();
    const albumInfo = triviaService.getAlbumInfo();
    const meanings = triviaService.getSongMeanings();
    
    setDailyTrivia(trivia);
    setAlbums(albumInfo);
    setSongMeanings(meanings);
  };

  const getRandomSongMeaning = () => {
    return triviaService.getRandomSongMeaning();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilRelease = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    release.setFullYear(today.getFullYear());
    
    if (release < today) {
      release.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = release - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl bg-black/40 border border-white/10">
        {/* Header */}
        <div className="p-6 text-white border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Taylor Swift Trivia & Facts</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-300 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-3 px-4 font-semibold transition-colors ${
              activeTab === 'daily'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Daily Fact
          </button>
          <button
            onClick={() => setActiveTab('albums')}
            className={`flex-1 py-3 px-4 font-semibold transition-colors ${
              activeTab === 'albums'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Albums
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className={`flex-1 py-3 px-4 font-semibold transition-colors ${
              activeTab === 'songs'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Song Meanings
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh] text-gray-200">
          {activeTab === 'daily' && (
            <DailyTriviaTab dailyTrivia={dailyTrivia} />
          )}
          
          {activeTab === 'albums' && (
            <AlbumsTab 
              albums={albums} 
              selectedAlbum={selectedAlbum}
              setSelectedAlbum={setSelectedAlbum}
              formatDate={formatDate}
              getDaysUntilRelease={getDaysUntilRelease}
            />
          )}
          
          {activeTab === 'songs' && (
            <SongsTab songMeanings={songMeanings} getRandomSongMeaning={getRandomSongMeaning} />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <p className="text-sm text-gray-300 text-center">
            Learn something new about Taylor Swift every day
          </p>
        </div>
      </div>
    </div>
  );
};

const DailyTriviaTab = ({ dailyTrivia }) => {
  if (!dailyTrivia) return null;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-100 mb-2">Today&apos;s Taylor Swift Fact</h3>
        <div className="inline-block bg-white/10 text-gray-100 px-3 py-1 rounded-full text-sm font-medium border border-white/10">
          {dailyTrivia.category}
        </div>
      </div>

      <div className="rounded-lg p-6 border border-white/10 bg-black/40 backdrop-blur">
        <p className="text-lg text-gray-200 leading-relaxed text-center">
          {dailyTrivia.fact}
        </p>
      </div>

      <div className="text-center text-sm text-gray-400">
        <p>This fact changes daily. Come back tomorrow for more Taylor Swift knowledge.</p>
      </div>
    </div>
  );
};

const AlbumsTab = ({ albums, selectedAlbum, setSelectedAlbum, formatDate, getDaysUntilRelease }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-100">Taylor Swift&apos;s Musical Journey</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {albums.map((album) => {
          const daysUntil = getDaysUntilRelease(album.releaseDate);
          const isUpcoming = daysUntil > 0 && daysUntil <= 30;
          
          return (
            <div
              key={album.name}
              onClick={() => setSelectedAlbum(selectedAlbum?.name === album.name ? null : album)}
              className={`rounded-lg p-4 border cursor-pointer transition-all hover:shadow-lg bg-black/30 border-white/10 hover:bg-black/50`}
            >
              <div className="text-center">
                <h4 className="font-semibold text-gray-100 mb-1">{album.name}</h4>
                <div className="text-sm text-gray-300 mb-2">{album.era}</div>
                
                <div className="space-y-1 text-xs text-gray-400">
                  <div>{formatDate(album.releaseDate)}</div>
                  <div>{album.trackCount} tracks</div>
                  <div>{album.genre}</div>
                </div>

                {isUpcoming && (
                  <div className="mt-2 inline-block bg-white/10 text-gray-100 px-2 py-1 rounded text-xs border border-white/10">
                    {daysUntil} days until anniversary
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Album Details */}
      {selectedAlbum && (
        <div className="mt-6 rounded-lg p-6 border border-white/10 bg-black/40 backdrop-blur">
          <h4 className="text-xl font-bold text-gray-100 mb-3">{selectedAlbum.name}</h4>
          <p className="text-gray-300 mb-4">{selectedAlbum.funFact}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-200">Release Date</div>
              <div className="text-gray-400">{formatDate(selectedAlbum.releaseDate)}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-200">Genre</div>
              <div className="text-gray-400">{selectedAlbum.genre}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-200">Tracks</div>
              <div className="text-gray-400">{selectedAlbum.trackCount}</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-200">Era</div>
              <div className="text-gray-400">{selectedAlbum.era}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SongsTab = ({ songMeanings, getRandomSongMeaning }) => {
  const [randomSong, setRandomSong] = useState(null);

  const showRandomSong = () => {
    setRandomSong(getRandomSongMeaning());
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-700">Song Meanings & Fun Facts</h3>
        <button
          onClick={showRandomSong}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          🎲 Random Song
        </button>
      </div>

      {/* Random Song Display */}
      {randomSong && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
          <h4 className="text-xl font-bold text-gray-800 mb-2">{randomSong.song}</h4>
          <div className="text-sm text-purple-600 mb-3">from {randomSong.album}</div>
          
          <div className="space-y-3">
            <div>
              <h5 className="font-semibold text-gray-700 mb-1">Meaning:</h5>
              <p className="text-gray-600">{randomSong.meaning}</p>
            </div>
            <div>
              <h5 className="font-semibold text-gray-700 mb-1">Fun Fact:</h5>
              <p className="text-gray-600">{randomSong.funFact}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Songs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {songMeanings.map((song) => (
          <div key={song.song} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors">
            <h4 className="font-semibold text-gray-800 mb-1">{song.song}</h4>
            <div className="text-sm text-purple-600 mb-2">{song.album}</div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Meaning:</span>
                <p className="text-gray-600">{song.meaning}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Fun Fact:</span>
                <p className="text-gray-600">{song.funFact}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Compact trivia component for inline use
export const CompactTrivia = ({ className = '', buttonClassName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${buttonClassName || `inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105`} ${className}`}
      >
        <span>Taylor Swift Trivia</span>
      </button>

      <TaylorTrivia
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}; 