'use client';

import React, { useState, useEffect } from 'react';
import { triviaService } from '@/utils/triviaService';
import { motion, AnimatePresence } from 'framer-motion';

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
    setDailyTrivia(triviaService.getDailyTrivia());
    setAlbums(triviaService.getAlbumInfo());
    setSongMeanings(triviaService.getSongMeanings());
  };

  const getRandomSongMeaning = () => triviaService.getRandomSongMeaning();

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const getDaysUntilRelease = (releaseDate) => {
    const today = new Date();
    const release = new Date(releaseDate);
    release.setFullYear(today.getFullYear());

    if (release < today) release.setFullYear(today.getFullYear() + 1);

    const diffTime = release - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl bg-gradient-to-br from-black/70 to-black/40 border border-white/10"
      >
        {/* Header */}
        <div className="p-6 text-white border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold">✨ Taylor Swift Trivia & Facts</h2>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl font-bold transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-black/30">
          {['daily', 'albums', 'songs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 font-semibold transition-all relative ${
                activeTab === tab
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab === 'daily' && 'Daily Fact'}
              {tab === 'albums' && 'Albums'}
              {tab === 'songs' && 'Song Meanings'}
              {activeTab === tab && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500"
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[65vh] text-gray-200">
          <AnimatePresence mode="wait">
            {activeTab === 'daily' && (
              <motion.div
                key="daily"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <DailyTriviaTab dailyTrivia={dailyTrivia} />
              </motion.div>
            )}

            {activeTab === 'albums' && (
              <motion.div
                key="albums"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <AlbumsTab
                  albums={albums}
                  selectedAlbum={selectedAlbum}
                  setSelectedAlbum={setSelectedAlbum}
                  formatDate={formatDate}
                  getDaysUntilRelease={getDaysUntilRelease}
                />
              </motion.div>
            )}

            {activeTab === 'songs' && (
              <motion.div
                key="songs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <SongsTab
                  songMeanings={songMeanings}
                  getRandomSongMeaning={getRandomSongMeaning}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 text-center text-sm text-gray-400">
          🌟 Learn something new about Taylor Swift every day
        </div>
      </motion.div>
    </div>
  );
};

/* ---------------- DAILY TRIVIA ---------------- */
const DailyTriviaTab = ({ dailyTrivia }) => {
  if (!dailyTrivia) return null;
  return (
    <div className="space-y-6 text-center">
      <h3 className="text-2xl font-bold text-pink-300">Today&apos;s Swift Fact</h3>
      <div className="inline-block bg-pink-600/20 text-pink-300 px-3 py-1 rounded-full text-sm font-medium border border-pink-500/30">
        {dailyTrivia.category}
      </div>

      <div className="rounded-lg p-6 border border-white/10 bg-black/50 backdrop-blur shadow-md">
        <p className="text-lg leading-relaxed">{dailyTrivia.fact}</p>
      </div>
    </div>
  );
};

/* ---------------- ALBUMS ---------------- */
const AlbumsTab = ({ albums, selectedAlbum, setSelectedAlbum, formatDate, getDaysUntilRelease }) => (
  <div className="space-y-6">
    <h3 className="text-xl font-semibold text-purple-300">Taylor&apos;s Musical Journey</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {albums.map((album) => {
        const daysUntil = getDaysUntilRelease(album.releaseDate);
        const isUpcoming = daysUntil > 0 && daysUntil <= 30;

        return (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={album.name}
            onClick={() =>
              setSelectedAlbum(selectedAlbum?.name === album.name ? null : album)
            }
            className="cursor-pointer rounded-xl p-5 border border-white/10 bg-gradient-to-br from-purple-900/40 to-pink-700/30 hover:shadow-xl transition-all"
          >
            <h4 className="text-lg font-bold text-white">{album.name}</h4>
            <p className="text-sm text-gray-300 mb-2">{album.era}</p>
            <p className="text-xs text-gray-400">{formatDate(album.releaseDate)}</p>
            <p className="text-xs text-gray-400">{album.trackCount} tracks</p>
            {isUpcoming && (
              <span className="mt-2 inline-block bg-pink-600/30 text-pink-300 px-2 py-1 rounded text-xs">
                {daysUntil} days until anniversary 🎉
              </span>
            )}
          </motion.div>
        );
      })}
    </div>

    {selectedAlbum && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 rounded-xl p-6 border border-white/10 bg-black/50 backdrop-blur shadow-lg"
      >
        <h4 className="text-xl font-bold text-pink-300 mb-2">{selectedAlbum.name}</h4>
        <p className="text-gray-300 mb-4">{selectedAlbum.funFact}</p>
      </motion.div>
    )}
  </div>
);

/* ---------------- SONGS ---------------- */
const SongsTab = ({ songMeanings, getRandomSongMeaning }) => {
  const [randomSong, setRandomSong] = useState(null);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-pink-300">Song Meanings & Fun Facts</h3>
        <button
          onClick={() => setRandomSong(getRandomSongMeaning())}
          className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105"
        >
          🎲 Random Song
        </button>
      </div>

      {randomSong && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg p-6 border border-white/10 bg-black/50 backdrop-blur shadow-md"
        >
          <h4 className="text-xl font-bold text-white mb-2">{randomSong.song}</h4>
          <p className="text-sm text-purple-400 mb-2">from {randomSong.album}</p>
          <p className="text-gray-300"><b>Meaning:</b> {randomSong.meaning}</p>
          <p className="text-gray-300 mt-2"><b>Fun Fact:</b> {randomSong.funFact}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {songMeanings.map((song) => (
          <motion.div
            key={song.song}
            whileHover={{ scale: 1.03 }}
            className="rounded-xl p-5 border border-white/10 bg-gradient-to-br from-purple-900/40 to-black/40 backdrop-blur"
          >
            <h4 className="text-lg font-bold text-white">{song.song}</h4>
            <p className="text-sm text-purple-400 mb-2">{song.album}</p>
            <p className="text-sm text-gray-300"><b>Meaning:</b> {song.meaning}</p>
            <p className="text-sm text-gray-400 mt-1"><b>Fun Fact:</b> {song.funFact}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- COMPACT BUTTON ---------------- */
export const CompactTrivia = ({ className = '', buttonClassName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${buttonClassName || 'px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:scale-105 transition-transform'} ${className}`}
      >
        Taylor Swift Trivia
      </button>
      <TaylorTrivia isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
