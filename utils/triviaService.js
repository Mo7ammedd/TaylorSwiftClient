// Taylor Swift Trivia Service
export class TriviaService {
  constructor() {
    this.triviaKey = 'taylor_swift_trivia_date';
    this.facts = this.getTriviaFacts();
    this.albums = this.getAlbumInfo();
    this.songMeanings = this.getSongMeanings();
  }

  // Get daily trivia fact
  getDailyTrivia() {
    const today = new Date().toDateString();
    const lastTriviaDate = localStorage.getItem(this.triviaKey);
    
    if (lastTriviaDate !== today) {
      localStorage.setItem(this.triviaKey, today);
      return this.getRandomFact();
    }
    
    // Return the fact for today (stored in localStorage)
    const storedFact = localStorage.getItem('taylor_swift_today_fact');
    return storedFact ? JSON.parse(storedFact) : this.getRandomFact();
  }

  // Get random trivia fact
  getRandomFact() {
    const randomFact = this.facts[Math.floor(Math.random() * this.facts.length)];
    localStorage.setItem('taylor_swift_today_fact', JSON.stringify(randomFact));
    return randomFact;
  }

  // Get album information
  getAlbumInfo() {
    return [
      {
        name: "Taylor Swift (Debut)",
        releaseDate: "2006-10-24",
        genre: "Country",
        funFact: "Taylor wrote 'Tim McGraw' when she was just 16 years old!",
        trackCount: 11,
        era: "Debut Era"
      },
      {
        name: "Fearless",
        releaseDate: "2008-11-11",
        genre: "Country Pop",
        funFact: "Fearless won Album of the Year at the 2010 Grammys, making Taylor the youngest artist to win this award!",
        trackCount: 13,
        era: "Fearless Era"
      },
      {
        name: "Speak Now",
        releaseDate: "2010-10-25",
        genre: "Country Pop",
        funFact: "Taylor wrote every song on this album completely by herself!",
        trackCount: 14,
        era: "Speak Now Era"
      },
      {
        name: "Red",
        releaseDate: "2012-10-22",
        genre: "Country Pop, Pop Rock",
        funFact: "Red was inspired by the 'red' emotions of love - intense, passionate, and sometimes painful.",
        trackCount: 16,
        era: "Red Era"
      },
      {
        name: "1989",
        releaseDate: "2014-10-27",
        genre: "Pop, Synth-pop",
        funFact: "1989 marked Taylor's complete transition from country to pop music!",
        trackCount: 13,
        era: "1989 Era"
      },
      {
        name: "Reputation",
        releaseDate: "2017-11-10",
        genre: "Pop, Electropop",
        funFact: "Reputation was Taylor's response to media scrutiny and public perception.",
        trackCount: 15,
        era: "Reputation Era"
      },
      {
        name: "Lover",
        releaseDate: "2019-08-23",
        genre: "Pop, Synth-pop",
        funFact: "Lover represents the 'golden' era of Taylor's life, filled with love and happiness.",
        trackCount: 18,
        era: "Lover Era"
      },
      {
        name: "Folklore",
        releaseDate: "2020-07-24",
        genre: "Indie Folk, Alternative",
        funFact: "Folklore was written and recorded during the COVID-19 pandemic and was a complete surprise release!",
        trackCount: 16,
        era: "Folklore Era"
      },
      {
        name: "Evermore",
        releaseDate: "2020-12-11",
        genre: "Indie Folk, Alternative",
        funFact: "Evermore is the sister album to Folklore and was also a surprise release!",
        trackCount: 15,
        era: "Evermore Era"
      },
      {
        name: "Midnights",
        releaseDate: "2022-10-21",
        genre: "Pop, Synth-pop",
        funFact: "Midnights explores 13 sleepless nights throughout Taylor's life, released at midnight!",
        trackCount: 13,
        era: "Midnights Era"
      },
      {
        name: "The Tortured Poets Department",
        releaseDate: "2024-04-19",
        genre: "Pop, Alternative",
        funFact: "This album was announced at the 2024 Grammys and features collaborations with Post Malone and Florence + The Machine!",
        trackCount: 16,
        era: "TTPD Era"
      }
    ];
  }

  // Get song meanings and fun facts
  getSongMeanings() {
    return [
      {
        song: "Love Story",
        album: "Fearless",
        meaning: "Inspired by Romeo and Juliet, but with a happy ending. Taylor wanted to show that love can overcome obstacles.",
        funFact: "The music video was filmed in a castle and features Taylor in a beautiful ballgown!"
      },
      {
        song: "All Too Well",
        album: "Red",
        meaning: "A deeply personal song about a past relationship that Taylor remembers 'all too well' - both the good and the bad.",
        funFact: "The original version was 10 minutes long, but was cut down for the album. The full version was later released!"
      },
      {
        song: "Shake It Off",
        album: "1989",
        meaning: "Taylor's response to critics and haters - she's learned to shake off negativity and be herself.",
        funFact: "The music video features Taylor dancing in different styles, showing her versatility!"
      },
      {
        song: "Blank Space",
        album: "1989",
        meaning: "Taylor's satirical take on how the media portrays her as a serial dater, playing into the stereotype.",
        funFact: "The music video was filmed at Oheka Castle in New York and cost over $1 million to make!"
      },
      {
        song: "Delicate",
        album: "Reputation",
        meaning: "About the early stages of a relationship when you're not sure if the other person feels the same way.",
        funFact: "The music video features Taylor dancing alone in various locations, showing vulnerability!"
      },
      {
        song: "Lover",
        album: "Lover",
        meaning: "A romantic ballad about finding true love and wanting to spend forever with that person.",
        funFact: "Taylor wrote this song on piano and it's one of her most romantic songs ever!"
      },
      {
        song: "Cardigan",
        album: "Folklore",
        meaning: "Part of the 'teenage love triangle' story, about a girl who feels like an old cardigan under someone's bed.",
        funFact: "The music video was directed by Taylor herself and filmed during quarantine!"
      },
      {
        song: "Anti-Hero",
        album: "Midnights",
        meaning: "Taylor's most vulnerable song about her insecurities and self-doubt, calling herself the 'anti-hero' of her own story.",
        funFact: "The music video features Taylor playing multiple versions of herself, including a giant version!"
      }
    ];
  }

  // Get trivia facts
  getTriviaFacts() {
    return [
      {
        fact: "Taylor Swift was born on December 13, 1989, in Reading, Pennsylvania.",
        category: "Personal",
        icon: "🎂"
      },
      {
        fact: "Taylor's first job was at a Christmas tree farm when she was 11 years old.",
        category: "Early Life",
        icon: "🌲"
      },
      {
        fact: "Taylor learned to play guitar when she was 12 years old.",
        category: "Music",
        icon: "🎸"
      },
      {
        fact: "Taylor's lucky number is 13, which is why she often incorporates it into her work.",
        category: "Fun Facts",
        icon: "13️⃣"
      },
      {
        fact: "Taylor has won 12 Grammy Awards, including 3 Album of the Year wins.",
        category: "Achievements",
        icon: "🏆"
      },
      {
        fact: "Taylor's cat, Olivia Benson, is named after Mariska Hargitay's character on Law & Order: SVU.",
        category: "Pets",
        icon: "🐱"
      },
      {
        fact: "Taylor wrote her first song, 'Lucky You', when she was 12 years old.",
        category: "Songwriting",
        icon: "✍️"
      },
      {
        fact: "Taylor's favorite color is purple, which is why it appears in many of her album covers.",
        category: "Personal",
        icon: "💜"
      },
      {
        fact: "Taylor has a degree in English Literature from New York University.",
        category: "Education",
        icon: "🎓"
      },
      {
        fact: "Taylor's song 'Tim McGraw' was inspired by her high school crush who was going to college.",
        category: "Songwriting",
        icon: "💕"
      },
      {
        fact: "Taylor has performed at the Super Bowl halftime show in 2024.",
        category: "Performances",
        icon: "🏈"
      },
      {
        fact: "Taylor's album '1989' is named after her birth year.",
        category: "Albums",
        icon: "📅"
      },
      {
        fact: "Taylor has written songs for other artists including Little Big Town and Sugarland.",
        category: "Songwriting",
        icon: "🎵"
      },
      {
        fact: "Taylor's favorite food is cheeseburgers and fries.",
        category: "Personal",
        icon: "🍔"
      },
      {
        fact: "Taylor has a fear of sea urchins, which she mentions in her song 'Clean'.",
        category: "Fun Facts",
        icon: "🌊"
      }
    ];
  }

  // Get upcoming Taylor Swift events
  getUpcomingEvents() {
    const today = new Date();
    const events = [
      {
        name: "Taylor Swift's Birthday",
        date: new Date(today.getFullYear(), 11, 13), // December 13
        description: "Celebrate Taylor's birthday!",
        icon: "🎉"
      },
      {
        name: "Album Release Anniversaries",
        dates: this.albums.map(album => ({
          album: album.name,
          date: new Date(album.releaseDate),
          description: `${album.name} anniversary`
        })),
        icon: "🎵"
      }
    ];

    return events;
  }

  // Get random song meaning
  getRandomSongMeaning() {
    return this.songMeanings[Math.floor(Math.random() * this.songMeanings.length)];
  }

  // Get album by name
  getAlbumByName(albumName) {
    return this.albums.find(album => 
      album.name.toLowerCase().includes(albumName.toLowerCase())
    );
  }

  // Get songs by album
  getSongsByAlbum(albumName) {
    const album = this.getAlbumByName(albumName);
    if (!album) return [];
    
    // This would typically come from a more comprehensive database
    // For now, return some sample songs
    const sampleSongs = {
      "Fearless": ["Fearless", "Fifteen", "Love Story", "White Horse", "You Belong With Me"],
      "Red": ["State of Grace", "Red", "Treacherous", "I Knew You Were Trouble", "All Too Well"],
      "1989": ["Welcome to New York", "Blank Space", "Style", "Out of the Woods", "Shake It Off"],
      "Lover": ["I Forgot That You Existed", "Cruel Summer", "Lover", "The Man", "You Need To Calm Down"]
    };
    
    return sampleSongs[album.name] || [];
  }
}

export const triviaService = new TriviaService(); 