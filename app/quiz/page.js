import CountdownTimer from "@/components/CountdownTimer";
import { BigLocalLoading } from "@/components/globals/Icons";
import RealQuiz from "@/components/RealQuiz";
import { Suspense } from "react";


export const metadata = {
  title: 'Taylor Swift quiz',
  description: 'quiz online with friends',
}

export default async function Page() {

  const data = await getData()
  if (!data || !Array.isArray(data) || data.length === 0) {
      return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Quiz Not Available</h1>
            <p>Unable to load quiz questions. Please try again later.</p>
          </div>
        </main>
      );
  }
  return (
    <main className="flex min-h-screen flex-col space-y-16 items-center justify-between p-4 md:p-24">
      <Suspense fallback={<BigLocalLoading />}>
        <CountdownTimer>
        <RealQuiz QuizQuestions={data} />
        </CountdownTimer>
      </Suspense>
    </main>
  );
}

async function getData() {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_QUESTIONS_ENDPOINT,  { next: { revalidate: 900 } });
    
    if (!response.ok) {
      console.error('Failed to fetch quiz data:', response.status);
      return [];
    }
    
    const data = await response.json();
    
    // Ensure data is an array with at least one question
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid quiz data format');
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return [];
  }
}

export const revalidate = 900 // revalidate at most every hour