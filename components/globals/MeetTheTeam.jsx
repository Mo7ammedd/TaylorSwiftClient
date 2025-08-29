import Image from "next/image";
import sharmo from '@/public/sharmo.jpg'
import mohamedtv from '@/public/muhamed.jpg'
import { HorizontalSpacer } from "./Icons";
export default function MeetTheTeam() {
  
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className=" flex flex-col justify-center gap-4">
        <div className="space-y-3 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Meet The Team</h2>
          <HorizontalSpacer small={true} />
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The talented mfs behind this.
          </p>
        </div>
        <div className="flex flex-row w-full justify-center flex-wrap gap-4">
         
          <a href="https://www.mohammedd.tech" className="flex flex-col items-center gap-2">
            <div className="h-20 w-20">
              <Image 
              className="border rounded-full"
              width='80'
              height='80'
              alt="mohameddtv" src={mohamedtv} />
            </div>
            <div className="text-sm font-medium">Mohammed Mostafa</div>
          </a>
          <a href="https://ebrahim-ramadan.vercel.app" className="flex flex-col items-center gap-2">
            <div className="h-20 w-20">
              <Image 
              className="border rounded-full"
              width='80'
              height='80'
              alt="sharmo" src={sharmo} />
            </div>
            <div className="text-sm font-medium">Ebrahim Ramadan</div>
          </a>
        </div>
      </div>
    </section>
  )
}