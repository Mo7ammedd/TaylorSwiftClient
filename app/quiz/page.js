import CountdownTimer from "@/components/CountdownTimer";
import { TinyLoading } from "@/components/globals/Icons";
import RealQuiz from "@/components/RealQuiz";
import { FetchQuizQuestions } from "@/utils/services";
import { Suspense } from "react";

export default async function Page() {
  const data = await getData()
  console.log('data', data);
  if (!data) {
      return (
          'ass'
      );
  }
  return (
    <main className="flex min-h-screen flex-col space-y-16 items-center justify-between p-4 md:p-24">
      <Suspense fallback={<TinyLoading />}>
        <CountdownTimer>
        <RealQuiz QuizQuestions={data} />

        </CountdownTimer>
      </Suspense>
    </main>
  );
}

async function getData() {
  const response = await fetch(process.env.NEXT_PUBLIC_QUESTIONS_ENDPOINT,  { next: { revalidate: 3600 } });
  const data = await response.json();

  return data
}

export const revalidate = 3600 // revalidate at most every hour