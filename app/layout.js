import { Header } from "@/components/globals/Header";
import { Inter } from "next/font/google";
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaylorSwift",
  description: "tell us how swiftie you are",
  openGraph: {
     images: ['https://lastfm.freetls.fastly.net/i/u/770x0/279c8c2263d174a662c6c29b89e93573.jpg#279c8c2263d174a662c6c29b89e93573'],
    title: 'TaylorSwift',
    description: 'tell us how swiftie you are',
  },
  title: {
    default: 'TaylorSwift',
    template: `%s - TaylorSwift`,
  },
  keywords: [
    "taylorswift",
    "quiz online",
    "entertainment",
    "play",
    "friends",
  ],
  description: 'TaylorSwift',
  creator: "Sharmo, Eldisha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: 'https://swiftiequiz.vercel.app',
    title: 'TaylorSwift',
    description: ' TaylorSwift',
    siteName: 'TaylorSwift',
    images: [
      {
        url: 'https://swiftiequiz.vercel.app/og',
        width: 1200,
        height: 630,
        alt: 'TaylorSwift',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: 'TaylorSwift',
    description: 'TaylorSwift',
    images: 'https://taylor-swift-quiz.vercel.app/og',
    creator: "@scoopsahoykid",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
  <html lang="en">
      <body className={inter.className}>
        <Header/>
          {children}
          <Analytics />
        </body>
    </html>
    </ViewTransitions>
  
  );
}
