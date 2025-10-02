'use client'
import React from 'react'
import { HorizontalSpacer } from './Icons'
import { Link } from 'next-view-transitions'
import { useRouter } from 'next/navigation'
import { CompactTrivia } from './TaylorTrivia'
import { QuizHistory } from './QuizHistory'


export const Landing = () => {
  const router = useRouter()
  const [Name, setName] = React.useState('');
  const [showHistory, setShowHistory] = React.useState(false);
  
  const saveName = () => {
    const safeName = Name && Name.trim() !== '' ? Name.trim() : 'ass'
    try {
      router.push(`/quiz?name=${encodeURIComponent(safeName)}`)
    } catch (e) {
      // Fallback navigation
      window.location.href = `/quiz?name=${encodeURIComponent(safeName)}`
    }
  }
  return (
    <>
    <div className="w-full rounded-xl bg-transparent">
       <svg
           className="absolute opacity-40 left-0 top-0 w-full h-full -z-10 object-cover"viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="b" cx="50%" cy="50%" r="50%" fx="20%" fy="36%"><stop offset="0%" stopColor="#DEA78C" /><stop offset="100%" stopColor="rgba(194,68,247,0.2)" /></radialGradient><filter id="a" x="-500" y="-500" width="2000" height="2000" filterUnits="userSpaceOnUse"><feGaussianBlur in="SourceGraphic" stdDeviation="100" /></filter></defs><rect width="100%" height="100%" /><g filter="url(#a)">

          <svg width="1000" height="1000" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" transform="translate(-217.252 25.924)"><path fill="url(#b)" d="M422 350.5q-56 100.5-174.5 105T104 355q-25-105 5.5-200t134-83.5q103.5 11.5 169 95t9.5 184Z" /></svg></g>
        </svg>
        <div className=" mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                Taylor Swift
              </h1>
            </div>
            <div className="flex justify-center">
              <img
                alt="Taylor Swift"
                className="rounded-full border border-2"
                height="200"
              src="
              https://i.pinimg.com/564x/7f/f1/47/7ff1479b6d3dc74d30224744a2a4c341.jpg"
                style={{
                  aspectRatio: "200/200",
                  objectFit: "cover",
                }}
                width="150"
              />
          </div>
          <input
            value={Name}
            onChange={(e)=>setName(e.target.value)}
            className="text-lg bg-transparent border-none outline-none text-center font-semibold text-gray-100"
          placeholder='Real Swiftie?...'
          />
         
          
            <button onClick={saveName}  className="hover:bg-[#AD7974] transition duration-200 rounded-[2rem] bg-[#B2847A] px-2 md:px-4 py-1 text-sm md:text-base md:py-2  font-bold ">
              hydra Hydra
          </button>
          
          {/* Feature Buttons (dark glass theme) */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              onClick={() => setShowHistory(true)}
              className="rounded-[2rem] px-3 md:px-5 py-2 text-sm md:text-base font-bold text-gray-100 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur"
            >
              View Progress
            </button>
            <CompactTrivia 
              buttonClassName="rounded-[2rem] px-3 md:px-5 py-2 text-sm md:text-base font-bold text-gray-100 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur"
            />
          </div>
          
          <HorizontalSpacer small={true}/>
          </div>
      </div>
      </div>
      
      {/* Quiz History Modal */}
      <QuizHistory 
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
      />
    </>
  )
}
