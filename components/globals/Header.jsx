import Image from 'next/image'
import React from 'react'
import gh from '@/public/gh.svg'

export const Header = () => {
  return (
      <div className='bg-gradient-to-b from-black to-transparent h-20 sticky top-0 z-40 sticky top-0 z-40  w-full fixed justify-end flex'>
          <a href='https://github.com/Mo7ammedd/TaylorSwiftClient' className='px-4 py-2'>
              <Image
                  alt='gh source code'
                  src={gh}
                  height='30'
                  width='30'
              />
          </a>
    </div>
  )
}
