'use client';

import { useEffect, useState } from'react';
import { Next, Previous } from '@/components/globals/Icons';
import gradientBG from '@/public/bg.jpeg';
import { FormulateQuote } from '@/utils/services';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { socket } from "@/utils/socket";
import ProgressBar from './globals/ProgressCircle';
import { FloatingCircles } from './globals/FloatingUsers';
import { TimeOutComponent } from './globals/TimeOut';
import { quizHistoryManager } from '@/utils/quizHistory';
import { CompactSharing } from './globals/SocialSharing';
import { CompactTrivia } from './globals/TaylorTrivia';

export default function RealQuiz({ QuizQuestions }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(QuizQuestions.length).fill(null));

  const [animateScore, setAnimateScore] = useState(false);
  const [QuizFinished, setQuizFinished] = useState(false);
  const [BackanimateScore, setBackAnimateScore] = useState(false);
  const [CurrentUsers, setCurrentUsers] = useState([]);

  useEffect(() => {
    if (animateScore) {
      const timeoutId = setTimeout(() => {
        setAnimateScore(false);
      }, 500); 
      return () => clearTimeout(timeoutId);
    }
  }, [animateScore]);

  const handleAnswer = (answer, index) => {
    setAnimateScore(true);
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[index] = answer;
    setSelectedAnswers(newSelectedAnswers);
  
    let newScore = score;
    if (answer === correctAnswer) {
      newScore += 1;
      setScore(newScore);
      socket.emit('updateScore', { socketId: socket.id, score: newScore });
    }
  
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < QuizQuestions.length) {
      setTimeout(() => {
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 300);
  
    } else {
      setQuizFinished(true);
      
      // Save quiz attempt to history
      const quizData = {
        score: score,
        totalQuestions: QuizQuestions.length,
        timeSpent: quizStartTime ? Date.now() - quizStartTime : 0,
        questions: QuizQuestions
      };
      quizHistoryManager.saveQuizAttempt(quizData);
    }
  };
  

  const handlePrevious = () => {
    setBackAnimateScore(true)

    if (currentQuestionIndex > 0) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }, 300);
    }
  };

  const handleNext = () => {
    setAnimateScore(true);

    if (currentQuestionIndex < QuizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }, 300);
    }
  };

  const [shuffledAnswers, setShuffledAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);

  useEffect(() => {
    const { question, answers } = QuizQuestions[currentQuestionIndex];
    setCorrectAnswer(answers[0]); 
    const incorrectAnswers = answers.slice(1);
    const allAnswers = [...incorrectAnswers, answers[0]]; 
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    setShuffledAnswers(allAnswers);
  }, [currentQuestionIndex, QuizQuestions]);

  const ass = FormulateQuote(QuizQuestions[currentQuestionIndex].question);



  const searchParams = useSearchParams()

  useEffect(() => {
    socket.emit('userData', { name: searchParams.get('name') });
    
    const handleUserList = (users) => {
      console.log('users', users);
      setCurrentUsers(users);
    };
  
    socket.on('userList', handleUserList);
  
    // Set quiz start time
    setQuizStartTime(Date.now());
  
    return () => {
      socket.off('userList', handleUserList);
      socket.off('initialUserList'); // Remove the listener for initialUserList
      socket.disconnect(); 
    };
  }, []);
  


  return (
    <>
     {QuizFinished ?
      <div className="space-y-6">
        <TimeOutComponent Quizfinished={true} score={score} />
        
        {/* Quiz Results Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
          <CompactSharing 
            quizResult={{ score, totalQuestions: QuizQuestions.length }}
            userName={searchParams.get('name') || 'Swiftie'}
            className="w-full sm:w-auto"
            buttonClassName="rounded-[2rem] px-3 md:px-5 py-2 text-sm md:text-base font-bold text-gray-100 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur"
          />
          <CompactTrivia 
            className="w-full sm:w-auto"
            buttonClassName="rounded-[2rem] px-3 md:px-5 py-2 text-sm md:text-base font-bold text-gray-100 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur"
          />
        </div>
      </div>
      :
      <div className="py-4">
      {CurrentUsers.length>0 &&
            <FloatingCircles names={CurrentUsers} myname={searchParams.get('name')} />
      }
     
        <div
       className="absolute left-1/2 -translate-x-1/2  left-0 top-0 w-full  -z-10 object-cover"
     >
       <Image
         className='md:hidden opacity-15'
         alt='gradient bg on mobile '
         src={gradientBG}
       width='500'
       height='500'
       />
       <div
         className='hidden md:block w-full min-h-screen opacity-50'
         style={{
           backgroundImage: "linear-gradient( 345deg, hsl(0deg 0% 0%) 17%, hsl(0deg 100% 5%) 61%, hsl(0deg 100% 6%) 77%, hsl(5deg 100% 6%) 86%, hsl(11deg 100% 6%) 93%, hsl(17deg 100% 6%) 97%, hsl(21deg 100% 7%) 100%, hsl(22deg 82% 8%) 101%, hsl(21deg 69% 8%) 102%, hsl(19deg 58% 9%) 100%)"
       }}>
         
      </div>
       </div>
     <ul className='absolute left-1/2 -translate-x-1/2 bottom-4 flex flex-col flex-wrap w-full px-4 gap-4 justify-center text-sm'>
      
       <div className={`flex flex-row justify-center flex-wrap w-full gap-2 ${animateScore?'score-animate' : ''} ${BackanimateScore&& 'back-score-animate'} `}>
         {shuffledAnswers.map((answer, index) => (
           <li key={index} className="">
             <button className={`transition duration-100 text-black font-bold py-2 px-4 rounded-[1.5rem] ${selectedAnswers[currentQuestionIndex] === answer? 'bg-[#DEA78C]' : 'bg-[#D0D0D0] hover:bg-[#B7B7B7]'}`} onClick={() => handleAnswer(answer, currentQuestionIndex)}>
               {answer}
             </button>
           </li>
         ))}
       </div>

       <div className="flex justify-center gap-4 items-center text-center w-full mt-4 space-x-2">
         <div className='flex flex-row gap-2'>
         <button className={`transition duration-100 text-white font-bold p-2 rounded-full ${currentQuestionIndex === 0? 'bg-transparent' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
           <Previous />
         </button>
         <button className={`transition duration-100 text-white font-bold p-2 rounded-full ${currentQuestionIndex === QuizQuestions.length - 1? 'bg-transparent' : 'bg-gray-900 hover:bg-gray-800'}`} onClick={handleNext} disabled={currentQuestionIndex === QuizQuestions.length - 1}>
           <Next />
         </button>
         </div>
         <button className={` transition duration-200 rounded-[2rem]  px-2 md:px-4 py-1 text-sm md:text-base md:py-2  font-bold ${currentQuestionIndex!= QuizQuestions.length - 1? 'bg-gray-800' : 'hover:bg-[#AD7974] bg-[#B2847A]'} `}
          disabled={currentQuestionIndex!= QuizQuestions.length - 1}>Submit</button>
       </div>

     </ul>
     <h2 className={`h-14 absolute top-16 right-2 md:top-20 md:right-10 px-2 text-base  sm:text-lg lg:text-xl font-bold `}>
       <div className='flex flex-row items-center gap-2'>
       <span className={`${animateScore?'score-animate' : ''}`}>
       {currentQuestionIndex + 1}
       </span>
      <span> /{QuizQuestions.length}</span>
       <ProgressBar currentQuestionIndex1={currentQuestionIndex} totalQuestions1={QuizQuestions.length} currentScore={score} />
      
       </div>
          </h2>
       
      <div className={` ${animateScore?'score-animate' : ''} ${BackanimateScore&& 'back-score-animate'}  border-l border-[#DEA78C] p-4 shadow-md`}>
        <h2 className=" text-base xs:text-lg sm:text-xl lg:text-2xl font-bold " style={{ whiteSpace: 'pre-line' }}>{ass}</h2>
      </div>
      
    </div>
      }
    </>
    
  );
}