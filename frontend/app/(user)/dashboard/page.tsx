"use client"
import Transition from "@/components/pageTransition"
import { Mic } from "lucide-react"
import { useReducer, useState } from "react";
import { motion } from "motion/react";
import { Settings } from "./settings";
import { Reply } from "./reply";

const testReply = `Hi Sarah,

After reviewing the Q3 performance data, I've concluded that we need to strategically realign our focus toward the enterprise segment. While our traction in the SMB market remains stable, the increasing churn rates suggest that our current high-touch model isn't sustainable for lower LTV accounts.

I’m proposing we implement a tiered account management framework. This will allow us to double down on our highest-value enterprise clients, ensuring they receive the specialized attention required for long-term retention and expansion, while automating more of the SMB journey.

Let's find 15 minutes tomorrow to discuss the logistics of this transition.

Best regards,
The Strategy Team`;

export default function Dashboard() {
  const [settings, dispatch] = useReducer(reducer, {
    tone: "casual",
    length: "short",
    audience: "general",
    language: "English",
  });

    return (
      <Transition>
        <div>
          <div className="grid lg:grid-cols-[1fr_0.5fr] gap-4 p-(--space-6) bg-(--surface-muted)">
            <div className="flex flex-col gap-(--space-12)">
            {/* recording section */}
            <div className="border rounded-xl p-(--space-4) bg-(--surface)">
               <div className="flex flex-col items-center justify-center gap-(--space-4) my-(--space-12)">
                 <div className="">
                  <button className="shadow-(--primary)"><Mic className="bg-primary p-3 rounded-full" color="white" size={60} /></button>
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
            <div className=" shadow-lg rounded-xl rounded-t-none pt-0 row-2 bg-(--surface)">
                <div className="bg-(--primary)/10 p-(--space-4) flex items-center justify-between">
                  <h3 className="text-(--text-muted)!">Transcript Preview</h3>
                  <small className="bg-(--primary)/20 p-(--space-1) rounded-md">Editable</small>
                </div>
                <div className="p-(--space-4) rounded-b-xl border">
                  <textarea name="transcript" id="transcript" className="resize-none w-full h-70 bg-(--surface-muted) border rounded-xl p-(--space-4)"></textarea>
                </div>
            </div> 
            </div>

            <div className="flex flex-col gap-(--space-12)">
            {/* reply settings section */}
            <div className="border rounded-xl px-(--space-4) bg-(--surface)">
              <Settings settingsState={settings} dispatch={dispatch} />
            </div>

            {/* reply section */}
            <div className="border rounded-xl  bg-(--surface)">
              <Reply reply={testReply} />
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
      className="w-2 h-12 bg-primary origin-bottom"
      >  
    </motion.div>
  )
}

function getVolume() {
  return Math.random();
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_TONE":
      return { ...state, tone: action.payload };
    case "SET_LENGTH":
      return { ...state, length: action.payload };
    case "SET_TARGET_AUDIENCE":
      return { ...state, targetAudience: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    default:
      return state;
  }
}