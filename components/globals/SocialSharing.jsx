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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 text-white bg-black/40 backdrop-blur border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Share Your Results</h2>
            <button
              onClick={closeModal}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Result Summary */}
          <div className="rounded-lg p-4 mb-6 border border-white/10 bg-black/40 backdrop-blur">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Congratulations, {userName}!
            </h3>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-100 mb-2">
                {Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%
              </div>
              <div className="text-gray-300">
                {quizResult.score} out of {quizResult.totalQuestions} correct
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-100">Share Your Achievement</h4>
            
            <div className="grid grid-cols-2 gap-3">
              {shareOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleShare(option.id)}
                  disabled={isGenerating}
                  className="flex items-center justify-center space-x-2 p-4 border border-white/10 rounded-lg bg-black/30 hover:bg-black/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-100"
                >
                  <span className="font-medium">{option.name}</span>
                </button>
              ))}
            </div>

            {/* Preview Button */}
            <button
              onClick={generatePreview}
              disabled={isGenerating}
              className="w-full p-3 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur"
            >
              {isGenerating ? 'Generating...' : 'Preview Custom Graphic'}
            </button>
          </div>

          {/* Success Message */}
          {shareMessage && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg text-green-700 text-center">
              {shareMessage}
            </div>
          )}

          {/* Preview Image */}
          {previewImage && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-100 mb-3">Preview</h4>
              <div className="border border-white/10 rounded-lg overflow-hidden bg-black/40 backdrop-blur">
                <img
                  src={previewImage}
                  alt="Quiz result preview"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-3 text-center">
                <button
                  onClick={() => handleShare('download')}
                  className="px-4 py-2 text-white rounded-lg transition-colors bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur"
                >
                  Download Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/40 backdrop-blur">
          <p className="text-sm text-gray-300 text-center">
            Share your Taylor Swift knowledge with the world
          </p>
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