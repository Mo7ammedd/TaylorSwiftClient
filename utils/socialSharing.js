// Social Media Sharing with Custom Graphics - Taylor Swift Themed
export class SocialSharingManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
  }

  // Generate custom result graphic with Taylor Swift theme
  async generateResultGraphic(quizResult, userName) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200;
      canvas.height = 630;
      const ctx = canvas.getContext('2d');

      // Premium dark gradient background with depth
      const bgGradient = ctx.createRadialGradient(600, 315, 0, 600, 315, 800);
      bgGradient.addColorStop(0, '#1a1a2e'); // Dark blue center
      bgGradient.addColorStop(0.6, '#16213e'); // Deeper blue
      bgGradient.addColorStop(1, '#0f0f1a'); // Almost black edges
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, 1200, 630);

      // Add noise texture for premium feel
      this.addNoiseTexture(ctx);

      // Add sparkles/stars pattern
      this.drawSparkles(ctx);

      // Glassmorphism card with blur effect simulation
      // Background blur simulation
      const blurGradient = ctx.createLinearGradient(100, 100, 1100, 530);
      blurGradient.addColorStop(0, 'rgba(255, 255, 255, 0.05)');
      blurGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)');
      blurGradient.addColorStop(1, 'rgba(147, 112, 219, 0.06)');
      ctx.fillStyle = blurGradient;
      ctx.fillRect(80, 80, 1040, 470);

      // Main glass card
      const glassGradient = ctx.createLinearGradient(100, 100, 1100, 530);
      glassGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
      glassGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.05)');
      glassGradient.addColorStop(0.7, 'rgba(147, 112, 219, 0.08)');
      glassGradient.addColorStop(1, 'rgba(0, 0, 0, 0.2)');
      ctx.fillStyle = glassGradient;
      ctx.fillRect(100, 100, 1000, 430);
      
      // Multiple border layers for glass effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.strokeRect(100, 100, 1000, 430);
      
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(101, 101, 998, 428);

      // Inner glow effect
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.strokeRect(105, 105, 990, 420);

      // Title with premium glow effect
      ctx.fillStyle = '#f4e4bc'; // Warm gold
      ctx.font = 'bold 52px "Times New Roman", serif';
      ctx.textAlign = 'center';
      
      // Create glow effect
      ctx.shadowColor = 'rgba(244, 228, 188, 0.6)';
      ctx.shadowBlur = 20;
      ctx.fillText('Taylor Swift Quiz Results', 600, 180);
      
      // Add secondary glow
      ctx.shadowColor = 'rgba(244, 228, 188, 0.3)';
      ctx.shadowBlur = 40;
      ctx.fillText('Taylor Swift Quiz Results', 600, 180);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // User name with subtle glow
      ctx.font = 'italic 34px "Times New Roman", serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
      ctx.shadowBlur = 8;
      ctx.fillText(`${userName}'s Swiftie Score`, 600, 235);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Score display with dramatic glow
      const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
      ctx.font = 'bold 88px "Times New Roman", serif';
      
      // Score color with enhanced vibrancy
      const scoreColor = this.getEraColor(percentage);
      ctx.fillStyle = scoreColor;
      
      // Multi-layer glow effect
      ctx.shadowColor = scoreColor.replace(')', ', 0.6)').replace('rgb', 'rgba');
      ctx.shadowBlur = 30;
      ctx.fillText(`${percentage}%`, 600, 335);
      
      ctx.shadowColor = scoreColor.replace(')', ', 0.3)').replace('rgb', 'rgba');
      ctx.shadowBlur = 50;
      ctx.fillText(`${percentage}%`, 600, 335);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Score details with glass styling
      ctx.font = '30px "Times New Roman", serif';
      ctx.fillStyle = 'rgba(244, 228, 188, 0.8)';
      ctx.shadowColor = 'rgba(244, 228, 188, 0.2)';
      ctx.shadowBlur = 5;
      ctx.fillText(`${quizResult.score} out of ${quizResult.totalQuestions} correct`, 600, 385);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Performance message with glass styling
      const eraMessage = this.getEraMessage(percentage);
      ctx.font = 'italic 26px "Times New Roman", serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.1)';
      ctx.shadowBlur = 3;
      ctx.fillText(eraMessage, 600, 430);

      // Footer with premium styling
      ctx.font = '22px "Times New Roman", serif';
      ctx.fillStyle = 'rgba(244, 228, 188, 0.7)';
      ctx.fillText('Powered by Mohammed Mostafa', 600, 475);

      // Website link with subtle glow
      ctx.font = '18px "Times New Roman", serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.1)';
      ctx.shadowBlur = 2;
      ctx.fillText('https://swiftiequiz.vercel.app/', 600, 505);
      
      // Reset shadow
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;

      // Taylor Swift signature elements
      this.drawTaylorElements(ctx);

      resolve(canvas);
    });
  }

  // Add subtle noise texture for premium feel
  addNoiseTexture(ctx) {
    const imageData = ctx.createImageData(1200, 630);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 10 - 5;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));     // Red
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise)); // Green
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise)); // Blue
      data[i + 3] = 8; // Very subtle alpha
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  // Draw premium sparkles with glow
  drawSparkles(ctx) {
    // Golden sparkles with glow
    ctx.shadowColor = 'rgba(244, 228, 188, 0.8)';
    ctx.shadowBlur = 8;
    ctx.fillStyle = '#f4e4bc';
    
    const sparklePositions = [
      {x: 180, y: 70, size: 3}, {x: 420, y: 85, size: 4},
      {x: 780, y: 75, size: 3}, {x: 1020, y: 95, size: 4},
      {x: 320, y: 570, size: 3}, {x: 880, y: 580, size: 3}
    ];

    sparklePositions.forEach(sparkle => {
      this.drawGlowingStar(ctx, sparkle.x, sparkle.y, sparkle.size);
    });

    // Purple accent sparkles
    ctx.shadowColor = 'rgba(147, 112, 219, 0.6)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = 'rgba(147, 112, 219, 0.8)';
    
    const purpleSparkles = [
      {x: 250, y: 130, size: 2}, {x: 950, y: 150, size: 2},
      {x: 450, y: 550, size: 2}, {x: 750, y: 560, size: 2}
    ];

    purpleSparkles.forEach(sparkle => {
      this.drawGlowingStar(ctx, sparkle.x, sparkle.y, sparkle.size);
    });
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  // Draw a glowing star shape
  drawGlowingStar(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    for (let i = 0; i < 5; i++) {
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, -size * 0.4);
      ctx.rotate(Math.PI / 5);
      ctx.lineTo(0, -size);
    }
    ctx.fill();
    ctx.restore();
  }

  // Draw premium Taylor Swift themed elements
  drawTaylorElements(ctx) {
    // Glowing hearts in corners
    ctx.shadowColor = 'rgba(147, 112, 219, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillStyle = 'rgba(147, 112, 219, 0.3)';
    this.drawHeart(ctx, 160, 140, 10);
    this.drawHeart(ctx, 1040, 140, 10);
    this.drawHeart(ctx, 160, 490, 10);
    this.drawHeart(ctx, 1040, 490, 10);

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;

    // Premium flowing curve with gradient
    const curveGradient = ctx.createLinearGradient(200, 540, 1000, 540);
    curveGradient.addColorStop(0, 'rgba(244, 228, 188, 0.2)');
    curveGradient.addColorStop(0.5, 'rgba(244, 228, 188, 0.4)');
    curveGradient.addColorStop(1, 'rgba(244, 228, 188, 0.2)');
    
    ctx.strokeStyle = curveGradient;
    ctx.lineWidth = 3;
    ctx.shadowColor = 'rgba(244, 228, 188, 0.3)';
    ctx.shadowBlur = 8;
    
    ctx.beginPath();
    ctx.moveTo(200, 540);
    ctx.bezierCurveTo(300, 520, 400, 560, 500, 540);
    ctx.bezierCurveTo(600, 520, 700, 560, 800, 540);
    ctx.bezierCurveTo(900, 520, 1000, 560, 1000, 540);
    ctx.stroke();
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  // Draw heart shape
  drawHeart(ctx, x, y, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.moveTo(0, size * 0.3);
    ctx.bezierCurveTo(-size * 0.5, -size * 0.2, -size, -size * 0.2, -size * 0.5, size * 0.3);
    ctx.bezierCurveTo(-size * 0.5, size * 0.6, 0, size, 0, size);
    ctx.bezierCurveTo(0, size, size * 0.5, size * 0.6, size * 0.5, size * 0.3);
    ctx.bezierCurveTo(size, -size * 0.2, size * 0.5, -size * 0.2, 0, size * 0.3);
    ctx.fill();
    ctx.restore();
  }

  // Get premium era-inspired colors with glow
  getEraColor(percentage) {
    if (percentage >= 90) return '#f4e4bc'; // Warm champagne gold
    if (percentage >= 80) return '#e85d75'; // Rose gold
    if (percentage >= 70) return '#a78bfa'; // Lavender purple
    if (percentage >= 60) return '#60a5fa'; // Sky blue
    return '#f87171'; // Coral red
  }

  // Get Taylor Swift era-themed messages (minimal)
  getEraMessage(percentage) {
    if (percentage >= 90) return "Mastermind level achieved";
    if (percentage >= 80) return "You belong with the best";
    if (percentage >= 70) return "Enchanted by your knowledge";
    if (percentage >= 60) return "Shake off those mistakes";
    return "Ready for another try";
  }

  // Get performance message
  getPerformanceMessage(percentage) {
    if (percentage >= 90) return "Mastermind level Swiftie";
    if (percentage >= 80) return "True Swiftie performance";
    if (percentage >= 70) return "Enchanted knowledge";
    if (percentage >= 60) return "Good Swiftie vibes";
    return "Keep practicing, Swiftie";
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
    link.download = `swiftie-quiz-result-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    return { success: true, message: 'Swiftie result downloaded successfully' };
  }

  // Share to Twitter
  shareToTwitter(quizResult, userName) {
    const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
    const eraMessage = this.getEraMessage(percentage);
    const text = `${eraMessage} - I scored ${percentage}% on the Taylor Swift Quiz! Test your Swiftie knowledge: tayler-swift.vercel.app #TaylorSwift #Swiftie`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    return { success: true, message: 'Shared to Twitter successfully' };
  }

  // Share to Facebook
  shareToFacebook(quizResult, userName) {
    const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
    const text = `I scored ${percentage}% on the Taylor Swift Quiz. Think you know Taylor Swift better?`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://tayler-swift.vercel.app')}&quote=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    return { success: true, message: 'Shared to Facebook successfully' };
  }

  // Share to WhatsApp
  shareToWhatsApp(quizResult, userName) {
    const percentage = Math.round((quizResult.score / quizResult.totalQuestions) * 100);
    const text = `I scored ${percentage}% on the Taylor Swift Quiz! Test your Swiftie knowledge: tayler-swift.vercel.app`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    return { success: true, message: 'Shared to WhatsApp successfully' };
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