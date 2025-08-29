// Quiz History Management
export class QuizHistoryManager {
  constructor() {
    this.storageKey = 'taylor_swift_quiz_history';
    this.progressKey = 'taylor_swift_quiz_progress';
  }

  // Save quiz attempt
  saveQuizAttempt(quizData) {
    const attempt = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      score: quizData.score,
      totalQuestions: quizData.totalQuestions,
      percentage: Math.round((quizData.score / quizData.totalQuestions) * 100),
      timeSpent: quizData.timeSpent || 0,
      questions: quizData.questions || []
    };

    const history = this.getQuizHistory();
    history.push(attempt);
    
    // Keep only last 50 attempts
    if (history.length > 50) {
      history.splice(0, history.length - 50);
    }
    
    localStorage.setItem(this.storageKey, JSON.stringify(history));
    this.updateProgress(attempt);
    
    return attempt;
  }

  // Get all quiz attempts
  getQuizHistory() {
    try {
      const history = localStorage.getItem(this.storageKey);
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error('Error reading quiz history:', error);
      return [];
    }
  }

  // Get user progress statistics
  getUserProgress() {
    const history = this.getQuizHistory();
    if (history.length === 0) {
      return {
        totalQuizzes: 0,
        averageScore: 0,
        bestScore: 0,
        totalQuestions: 0,
        streak: 0,
        improvement: 0
      };
    }

    const totalQuizzes = history.length;
    const totalScore = history.reduce((sum, attempt) => sum + attempt.score, 0);
    const averageScore = Math.round(totalScore / totalQuizzes);
    const bestScore = Math.max(...history.map(attempt => attempt.percentage));
    const totalQuestions = history.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
    
    // Calculate streak (consecutive quizzes with improving scores)
    let streak = 0;
    let improvement = 0;
    
    for (let i = 1; i < history.length; i++) {
      if (history[i].percentage > history[i-1].percentage) {
        streak++;
        improvement += history[i].percentage - history[i-1].percentage;
      } else {
        streak = 0;
      }
    }

    return {
      totalQuizzes,
      averageScore,
      bestScore,
      totalQuestions,
      streak,
      improvement: Math.round(improvement / totalQuizzes)
    };
  }

  // Update progress tracking
  updateProgress(attempt) {
    const progress = this.getProgress();
    progress.lastQuizDate = attempt.timestamp;
    progress.totalQuizzes++;
    progress.totalScore += attempt.score;
    progress.totalQuestions += attempt.totalQuestions;
    
    if (attempt.percentage > progress.bestScore) {
      progress.bestScore = attempt.percentage;
      progress.bestScoreDate = attempt.timestamp;
    }
    
    localStorage.setItem(this.progressKey, JSON.stringify(progress));
  }

  // Get progress data
  getProgress() {
    try {
      const progress = localStorage.getItem(this.progressKey);
      return progress ? JSON.parse(progress) : {
        lastQuizDate: null,
        totalQuizzes: 0,
        totalScore: 0,
        totalQuestions: 0,
        bestScore: 0,
        bestScoreDate: null
      };
    } catch (error) {
      console.error('Error reading progress:', error);
      return {
        lastQuizDate: null,
        totalQuizzes: 0,
        totalScore: 0,
        totalQuestions: 0,
        bestScore: 0,
        bestScoreDate: null
      };
    }
  }

  // Clear history (for testing or user preference)
  clearHistory() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.progressKey);
  }
}

export const quizHistoryManager = new QuizHistoryManager(); 