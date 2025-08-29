import { HorizontalSpacer } from "@/components/globals/Icons";
import { Landing } from "@/components/globals/Landing";
import MeetTheTeam from "@/components/globals/MeetTheTeam";
import { SwiftGallery } from "@/components/globals/SwiftGallery";
import { SongSuggestion } from "@/components/globals/SongSuggestion";
import { IconsInBg } from "@/components/globals/IconsInBg";
import { ShuffleMe } from "@/components/globals/ShuffleMe";
import { CompactTrivia } from "@/components/globals/TaylorTrivia";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-4 md:px-24 md:py-12">
            <SongSuggestion/>
<IconsInBg/>
      <Landing/>
      <SwiftGallery />
      <HorizontalSpacer small={false} />
      
   {/* Taylor Swift Trivia Section */}
<div className="w-full min-h-[50vh] flex flex-col justify-center items-center text-center">
  <h2 className="text-3xl font-bold text-white mb-6">
    Learn About Taylor Swift
  </h2>
  <CompactTrivia
    className="text-lg"
    buttonClassName="rounded-[2rem] px-4 md:px-6 py-2 text-base font-bold text-gray-100 bg-black/40 hover:bg-black/60 border border-white/10 backdrop-blur"
  />
</div>

      
      <HorizontalSpacer small={false} />
      <MeetTheTeam />
      <HorizontalSpacer small={false} />
      <ShuffleMe/>
      {/* <QuizSocketClient/> */}
    </main>
  );
}
