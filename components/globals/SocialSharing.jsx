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
      setTimeout(() => setShareMessage(''), 3000);
    } catch {
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
      setPreviewImage(canvas.toDataURL());
    } catch (err) {
      console.error('Preview error:', err);
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl bg-black/40 border border-white/10">
        {/* Header */}
        <div className="p-6 text-white border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Share Your Results</h2>
          <button
            onClick={closeModal}
            className="text-white hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[65vh] space-y-8">
          {/* Result Card */}
          <div className="rounded-lg p-6 border border-white/10 bg-black/30 backdrop-blur text-center">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Congratulations, {userName}!
            </h3>
            <div className="text-6xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
              {Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%
            </div>
            <div className="text-lg text-gray-300">
              {quizResult.score} out of {quizResult.totalQuestions} correct
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white text-center">Share Your Achievement</h4>
            <div className="grid grid-cols-2 gap-4">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  disabled={isGenerating}
                  className="rounded-lg p-4 border border-white/10 bg-black/30 hover:bg-black/50 transition-all text-gray-200 font-medium disabled:opacity-50"
                >
                  {option.name}
                </button>
              ))}
            </div>

            {/* Preview Button */}
            <button
              onClick={generatePreview}
              disabled={isGenerating}
              className="w-full p-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors text-white font-semibold disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : 'Preview Custom Graphic'}
            </button>
          </div>

          {/* Success Message */}
          {shareMessage && (
            <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-200 text-center">
              {shareMessage}
            </div>
          )}

          {/* Preview */}
          {previewImage && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white text-center">Preview</h4>
              <div className="rounded-lg overflow-hidden border border-white/10 bg-black/30 backdrop-blur">
                <img src={previewImage} alt="Quiz result preview" className="w-full h-auto" />
              </div>
              <div className="text-center">
                <button
                  onClick={() => handleShare('download')}
                  className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 transition-colors text-white font-semibold"
                >
                  Download Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 text-sm text-gray-300 text-center">
          Share your Taylor Swift knowledge with the world
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