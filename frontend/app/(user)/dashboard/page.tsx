"use client"
import Transition from "@/components/pageTransition"
import { Mic, Settings } from "lucide-react"
import { useState } from "react";
import { motion } from "motion/react";

export default function Dashboard() {
    return (
      <Transition>
        <div>
          <div className="grid lg:grid-cols-[1fr_0.5fr] grid-rows-2 gap-4 p-(--space-6) bg-(--surface-muted)">
            {/* recording section */}
            <div className="border border-(--border) rounded-xl p-(--space-4) bg-(--surface)">
               <div className="flex flex-col items-center justify-center gap-(--space-4) my-(--space-12)">
                 <div className="">
                  <button className="shadow-(--primary)"><Mic className="bg-(--primary) p-3 rounded-full" color="white" size={60} /></button>
                 </div>
                 <div className="text-center">
                  <h4>00:00</h4>
                  <p>Tap the mic to start recording</p>
                 </div>
               </div>

              <div className="flex items-center justify-center gap-(--space-1) my-(--space-12)">
{                ([1,2,3,4,5,6,7,8,9,10].map((_, i) => (
                  <VoiceMeter key={i} isRecording={false} />
                )))}
              </div>  
            </div> 
            {/* transcript section */}
            <div className=" shadow-lg rounded-xl rounded-t-none pt-0 row-2 bg-(--surface) h-full">
                <div className="bg-(--primary)/10 p-(--space-4) flex items-center justify-between">
                  <h3 className="text-(--text-muted)!">Transcript Preview</h3>
                  <small className="bg-(--primary)/20 p-(--space-1) rounded-md">Editable</small>
                </div>
                <div className="p-(--space-4) border border-(--border)">
                  <textarea name="transcript" id="transcript" className="resize-none w-full h-70 bg-(--surface-muted) border border-(--border) rounded-xl p-(--space-4)"></textarea>
                </div>
            </div> 
            {/* reply settings section */}
            <div className="border border-(--border) rounded-xl p-(--space-4) bg-(--surface)">
              <div className="flex items-center gap-(--space-2)">
                <Settings className="text-(--text-primary)" size={20} />
                <h3 className="text-(--text-primary)">Reply settings</h3>
              </div>
              <div>
                {/* settings */}
                <div className="flex flex-wrap gap-(--space-2)">
                  <div>
                    <p>Tone</p>
                    <div className="flex items-center gap-(--space-2)">
                      <select name="" id="" className="bg-(--primary)/10 p-(--space-1) rounded-md">
                        {["Professional", "Casual", "Friendly", "Formal"].map((tone, i) => (
                          <option key={i} className="bg-(--primary)/10 p-(--space-1) rounded-md">{tone}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <p>Length</p>
                    <div className="flex items-center gap-(--space-2)">
                      <select name="" id="" className="bg-(--primary)/10 p-(--space-1) rounded-md">
                        {["Professional", "Casual", "Friendly", "Formal"].map((tone, i) => (
                          <option key={i} className="bg-(--primary)/10 p-(--space-1) rounded-md">{tone}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <p>Target Audience</p>
                    <div className="flex items-center gap-(--space-2)">
                      <select name="" id="" className="bg-(--primary)/10 p-(--space-1) rounded-md">
                        {["Professional", "Casual", "Friendly", "Formal"].map((tone, i) => (
                          <option key={i} className="bg-(--primary)/10 p-(--space-1) rounded-md">{tone}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <p>Language</p>
                    <div className="flex items-center gap-(--space-2)">
                      <select name="" id="" className="bg-(--primary)/10 p-(--space-1) rounded-md">
                        {["Professional", "Casual", "Friendly", "Formal"].map((tone, i) => (
                          <option key={i} className="bg-(--primary)/10 p-(--space-1) rounded-md">{tone}</option>
                        ))}
                      </select>
                    </div>
                  </div>


               </div>
                
              </div>
            </div>
          </div> 
        </div>
      </Transition>
    )
}

function VoiceMeter({isRecording}: {isRecording: boolean}) {
  const [volume, setVolume] = useState(getVolume());
  return (
    <motion.div
      initial={{ scaleY: 0.1 }}
      animate={isRecording ? { 
        scaleY: volume
      } : { scaleY: 0.1 }}
      transition={{ 
        duration: 0.35, // Duration of each loop
        ease: [0.22, 0.61, 0.88, 0.99], 
        bounce: 0.75
      }}
      onAnimationComplete={() => {
        let newVolume = getVolume();
        while(Math.abs(newVolume - volume) < 0.1) {
          newVolume = getVolume();
        }
        setVolume(newVolume);
      }}
      className="w-2 h-12 bg-(--primary) origin-bottom"
      >  
    </motion.div>
  )
}

function getVolume() {
  return Math.random();
}