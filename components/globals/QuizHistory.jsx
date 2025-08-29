'use client';

import React, { useState, useEffect } from 'react';
import { quizHistoryManager } from '@/utils/quizHistory';
import { HorizontalSpacer } from './Icons';

export const QuizHistory = ({ isOpen, onClose }) => {
  const [history, setHistory] = useState([]);
  const [progress, setProgress] = useState({});
  const [activeTab, setActiveTab] = useState('progress');

  useEffect(() => {
    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  const loadHistory = () => {
    const quizHistory = quizHistoryManager.getQuizHistory();
    const userProgress = quizHistoryManager.getUserProgress();
    setHistory(quizHistory);
    setProgress(userProgress);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (percentage) => {
    if (percentage >= 90) return 'text-yellow-400';
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 70) return 'text-orange-400';
    if (percentage >= 60) return 'text-red-400';
    return 'text-red-600';
  };

  const getScoreEmoji = (percentage) => {
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🎉';
    if (percentage >= 70) return '✨';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
      <div className="rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl bg-black/40 border border-white/10">
        {/* Header */}
        <div className="p-6 text-white border-b border-white/10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Quiz Journey</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab('progress')}
            className={`flex-1 py-3 px-4 font-semibold transition-colors ${
              activeTab === 'progress'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Progress Overview
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 px-4 font-semibold transition-colors ${
              activeTab === 'history'
                ? 'text-white border-b-2 border-white'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            Quiz History
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'progress' ? (
            <ProgressOverview progress={progress} />
          ) : (
            <QuizHistoryList history={history} formatDate={formatDate} getScoreColor={getScoreColor} getScoreEmoji={getScoreEmoji} />
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-300">
              {history.length} quiz attempts • Last updated: {history.length > 0 ? formatDate(history[history.length - 1].timestamp) : 'Never'}
            </span>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to clear all quiz history? This cannot be undone.')) {
                  quizHistoryManager.clearHistory();
                  loadHistory();
                }
              }}
              className="text-red-400 hover:text-red-500 text-sm font-medium"
            >
              Clear History
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProgressOverview = ({ progress }) => {
  if (progress.totalQuizzes === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🎵</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Quizzes Taken Yet</h3>
        <p className="text-gray-500">Take your first Taylor Swift quiz to see your progress here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Quizzes"
          value={progress.totalQuizzes}
          icon="📚"
          color="bg-blue-500"
        />
        <StatCard
          title="Average Score"
          value={`${progress.averageScore}%`}
          icon="📊"
          color="bg-green-500"
        />
        <StatCard
          title="Best Score"
          value={`${progress.bestScore}%`}
          icon="🏆"
          color="bg-yellow-500"
        />
        <StatCard
          title="Current Streak"
          value={progress.streak}
          icon="🔥"
          color="bg-red-500"
        />
      </div>

      {/* Progress Bars */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Performance Trends</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Overall Improvement</span>
            <span className={`text-sm font-bold ${progress.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {progress.improvement > 0 ? '+' : ''}{progress.improvement}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${progress.improvement > 0 ? 'bg-green-500' : 'bg-red-500'}`}
              style={{ width: `${Math.min(Math.abs(progress.improvement), 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Questions Answered</span>
            <span className="text-sm font-bold text-gray-800">{progress.totalQuestions}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-purple-500"
              style={{ width: `${Math.min((progress.totalQuestions / 100) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-200">
        <h4 className="font-semibold text-gray-800 mb-2">💫 Keep Going, Swiftie!</h4>
        <p className="text-gray-600 text-sm">
          {progress.improvement > 0 
            ? `You're improving by ${progress.improvement}% on average! Keep up the great work!`
            : progress.totalQuizzes > 5
            ? "Practice makes perfect! Try focusing on areas where you can improve."
            : "You're just getting started! Each quiz helps you become a better Swiftie!"
          }
        </p>
      </div>
    </div>
  );
};

const QuizHistoryList = ({ history, formatDate, getScoreColor, getScoreEmoji }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Quiz History</h3>
        <p className="text-gray-500">Your quiz attempts will appear here!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700">Recent Quiz Attempts</h3>
        <span className="text-sm text-gray-500">Showing last {history.length} attempts</span>
      </div>
      
      <div className="space-y-3">
        {history.slice().reverse().map((attempt, index) => (
          <div
            key={attempt.id}
            className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getScoreEmoji(attempt.percentage)}</div>
                <div>
                  <div className="font-semibold text-gray-800">
                    Quiz #{history.length - index}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(attempt.timestamp)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(attempt.percentage)}`}>
                  {attempt.percentage}%
                </div>
                <div className="text-sm text-gray-600">
                  {attempt.score}/{attempt.totalQuestions} correct
                </div>
              </div>
            </div>
            
            {attempt.timeSpent > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                ⏱️ Completed in {Math.round(attempt.timeSpent / 1000)}s
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-lg p-4 border border-gray-200 text-center">
    <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white text-xl mx-auto mb-2`}>
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{title}</div>
  </div>
); 