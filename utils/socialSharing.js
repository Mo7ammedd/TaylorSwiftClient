// Social Media Sharing with Custom Graphics
export class SocialSharingManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
  }

  // Generate custom result graphic
  async generateResultGraphic(quizResult, userName) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext('2d');

      // Dark glass background
      const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#141414');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 1200, 630);

      // Add subtle pattern
      this.drawPattern(ctx);

      // Main content area
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.fillRect(100, 100, 1000, 430);
      
      // Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 3;
      ctx.strokeRect(100, 100, 1000, 430);

      // Title
      ctx.fillStyle = '#EAEAEA';
      ctx.font = 'bold 48px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Taylor Swift Quiz Results', 600, 180);

      // User name
      ctx.font = '32px Arial, sans-serif';
      ctx.fillText(`${userName} Performance`, 600, 230);

      // Score display
      const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
      ctx.font = 'bold 72px Arial, sans-serif';
      ctx.fillStyle = '#EAEAEA';
      ctx.fillText(`${percentage}%`, 600, 320);

      // Score details
      ctx.font = '24px Arial, sans-serif';
      ctx.fillStyle = '#CFCFCF';
      ctx.fillText(`${quizResult.score} out of ${quizResult.totalQuestions} correct`, 600, 370);

      // Performance message
      ctx.font = '24px Arial, sans-serif';
      ctx.fillStyle = 'rgba(234, 234, 234, 0.7)';
      ctx.fillText('Powered by Taylor Swift Quiz', 600, 420);

      // Footer
      ctx.font = '20px Arial, sans-serif';
      ctx.fillStyle = 'rgba(234, 234, 234, 0.6)';
      ctx.fillText('tayler-swift.vercel.app', 600, 500);

      // Taylor Swift signature style
      this.drawSignature(ctx);

      resolve(canvas);
    });
  }

  // Draw background pattern
  drawPattern(ctx) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 1200; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 630);
      ctx.stroke();
    }
    
    for (let i = 0; i < 630; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1200, i);
      ctx.stroke();
    }
  }

  // Draw signature style element
  drawSignature(ctx) {
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 550);
    ctx.quadraticCurveTo(300, 500, 400, 550);
    ctx.quadraticCurveTo(500, 600, 600, 550);
    ctx.stroke();
  }

  // Kept for compatibility (unused in dark theme)
  getScoreColor(percentage) {
    return '#EAEAEA';
  }

  // Get performance message
  getPerformanceMessage(percentage) {
    if (percentage >= 90) return "Top tier performance";
    if (percentage >= 80) return "Excellent performance";
    if (percentage >= 70) return "Great performance";
    if (percentage >= 60) return "Good performance";
    return "Keep practicing";
  }

  // Share to social media
  async shareResult(quizResult, userName, platform = 'download') {
    try {
      const canvas = await this.generateResultGraphic(quizResult, userName);
      
      if (platform === 'download') {
        return this.downloadImage(canvas);
      } else if (platform === 'twitter') {
        return this.shareToTwitter(quizResult, userName);
      } else if (platform === 'facebook') {
        return this.shareToFacebook(quizResult, userName);
      } else if (platform === 'whatsapp') {
        return this.shareToWhatsApp(quizResult, userName);
      }
    } catch (error) {
      console.error('Error sharing result:', error);
      throw error;
    }
  }

  // Download image
  downloadImage(canvas) {
    const link = document.createElement('a');
    link.download = `taylor-swift-quiz-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    return { success: true, message: 'Image downloaded successfully!' };
  }

  // Share to Twitter
  shareToTwitter(quizResult, userName) {
    const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
    const text = `I scored ${percentage}% on the Taylor Swift Quiz. Try it: tayler-swift.vercel.app #TaylorSwift #Swiftie`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    return { success: true, message: 'Shared to Twitter!' };
  }

  // Share to Facebook
  shareToFacebook(quizResult, userName) {
    const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
    const text = `I scored ${percentage}% on the Taylor Swift Quiz.`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://tayler-swift.vercel.app')}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    return { success: true, message: 'Shared to Facebook!' };
  }

  // Share to WhatsApp
  shareToWhatsApp(quizResult, userName) {
    const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
    const text = `I scored ${percentage}% on the Taylor Swift Quiz. Try it: tayler-swift.vercel.app`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    return { success: true, message: 'Shared to WhatsApp!' };
  }

  // Get share options
  getShareOptions() {
    return [
      { id: 'download', name: 'Download Image' },
      { id: 'twitter', name: 'Share on Twitter' },
      { id: 'facebook', name: 'Share on Facebook' },
      { id: 'whatsapp', name: 'Share on WhatsApp' }
    ];
  }
}

export const socialSharingManager = new SocialSharingManager(); 