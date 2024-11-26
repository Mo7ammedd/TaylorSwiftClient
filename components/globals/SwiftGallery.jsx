'use client'
import { motion } from 'framer-motion';

export const SwiftGallery = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, transition: { duration: 0.3 } }}
    transition={{ duration: 0.6, ease: 'easeInOut' }}
    className='grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent py-16'
    >
     <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/aa5258e17685f4fbe30bc83e4ee9d651.jpg#aa5258e17685f4fbe30bc83e4ee9d651" alt=""/>
        </div>
      <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/fb01a709286ef3445e019d072ec5d9f0.jpg#fb01a709286ef3445e019d072ec5d9f0" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/279c8c2263d174a662c6c29b89e93573.jpg#279c8c2263d174a662c6c29b89e93573" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/cb434ff45430c2cf4080c1abd118adce.jpg#cb434ff45430c2cf4080c1abd118adce" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://i.pinimg.com/736x/e3/a2/a0/e3a2a028602b0070fa5eae8225b238f9.jpg" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/48aa10ec26931086835287e62064ee00.jpg#48aa10ec26931086835287e62064ee00" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/f44952495464f0809ea015c8bd352710.jpg#f44952495464f0809ea015c8bd352710" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/424c9e36ad2ef2b48b1a6f96e64acfa0.jpg#424c9e36ad2ef2b48b1a6f96e64acfa0" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/dec736c267038c099baf5b80326e93f9.jpg#dec736c267038c099baf5b80326e93f9" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/480b79f5a29bd51e6a2d77af37182af7.jpg#480b79f5a29bd51e6a2d77af37182af7" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/97d8e36473d094679ad8bca19fad2037.jpg#97d8e36473d094679ad8bca19fad2037" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-xl" src="https://lastfm.freetls.fastly.net/i/u/770x0/eccfb2e92a1e8431d489ff1aeefd0707.jpg#eccfb2e92a1e8431d489ff1aeefd0707" alt=""/>
        </div>
          </div>
     
    </motion.div>


  )
}
