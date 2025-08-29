'use client';

import React, { useState } from 'react';
import { socialSharingManager } from '@/utils/socialSharing';

export const SocialSharing = ({ quizResult, userName, isOpen, onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  if (!isOpen) return null;

  const shareOptions = socialSharingManager.getShareOptions();

  const handleShare = async (platform) => {
    if (!quizResult) return;

    setIsGenerating(true);
    setShareMessage('');

    try {
      const result = await socialSharingManager.shareResult(quizResult, userName, platform);
      setShareMessage(result.message);
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setShareMessage(''), 3000);
    } catch (error) {
      setShareMessage('Error sharing result. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generatePreview = async () => {
    if (!quizResult) return;

    setIsGenerating(true);
    try {
      const canvas = await socialSharingManager.generateResultGraphic(quizResult, userName);
      const dataUrl = canvas.toDataURL();
      setPreviewImage(dataUrl);
    } catch (error) {
      console.error('Error generating preview:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const closeModal = () => {
    setPreviewImage(null);
    setShareMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl">
        {/* Glassmorphism Container */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 animate-pulse"></div>
          
          {/* Content Container */}
          <div className="relative z-10">
            {/* Header */}
            <div className="relative p-8 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white tracking-tight">Share Your Results</h2>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-gray-200 transition-all duration-200 flex items-center justify-center backdrop-blur-sm"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Result Summary Card */}
              <div className="relative bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
                <div className="relative z-10 text-center">
                  <h3 className="text-xl font-semibold text-white/90 mb-4">
                    Congratulations, {userName}!
                  </h3>
                  <div className="text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                    {Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%
                  </div>
                  <div className="text-lg text-white/70">
                    {quizResult.score} out of {quizResult.totalQuestions} correct
                  </div>
                </div>
              </div>

              {/* Share Options */}
              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-white text-center">Share Your Achievement</h4>
                
                <div className="grid grid-cols-2 gap-4">
                  {shareOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleShare(option.id)}
                      disabled={isGenerating}
                      className="group relative p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 text-center">
                        <div className="text-white font-medium group-hover:text-purple-200 transition-colors duration-300">
                          {option.name}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Preview Button */}
                <button
                  onClick={generatePreview}
                  disabled={isGenerating}
                  className="w-full p-4 text-white rounded-xl transition-all duration-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 border border-white/20 hover:border-white/30 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{isGenerating ? 'Generating...' : 'Preview Custom Graphic'}</span>
                  </div>
                </button>
              </div>

              {/* Success Message */}
              {shareMessage && (
                <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-green-200 text-center backdrop-blur-sm">
                  {shareMessage}
                </div>
              )}

              {/* Preview Image */}
              {previewImage && (
                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-white text-center">Preview</h4>
                  <div className="relative rounded-2xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-sm">
                    <img
                      src={previewImage}
                      alt="Quiz result preview"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      onClick={() => handleShare('download')}
                      className="px-6 py-3 text-white rounded-xl transition-all duration-300 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 border border-white/20 hover:border-white/30 backdrop-blur-sm"
                    >
                      Download Image
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-white/10 bg-white/5 backdrop-blur-sm">
              <p className="text-sm text-white/60 text-center">
                Share your Taylor Swift knowledge with the world
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact sharing component for inline use
export const CompactSharing = ({ quizResult, userName, className = '', buttonClassName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!quizResult) return null;

  const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`${buttonClassName || `rounded-[2rem] px-3 md:px-5 py-2 text-sm md:text-base font-bold text-gray-100 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur`} ${className}`}
      >
        Share {percentage}% Score
      </button>

      <SocialSharing
        quizResult={quizResult}
        userName={userName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}; 