"use client"
import { Mic } from "lucide-react"
import { ActionDispatch, memo, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { ReplyStateAction, SpeechRecognitionErrorEvent, SpeechRecognitionEvent } from "@/lib/types";

 function Recorder({ dispatch}: {dispatch: ActionDispatch<[action: ReplyStateAction]>}) {
  const [isRecording, setIsRecording] = useState(false);
  const [ speechRecognition, setSpeechRecognition] = useState<SpeechRecognition | null>(null);
  const recordRef = useRef<HTMLButtonElement>(null);
    const handleClick = () => {
      if (isRecording) {
        if (speechRecognition) {
          stopTranscript(speechRecognition);
          setIsRecording(false);
          setSpeechRecognition(null);
        }
      } else {
        const speechRecognition = startTranscript(setSpeechRecognition);
        if (speechRecognition) {
          
          setSpeechRecognition(speechRecognition);
          setIsRecording(true);
          // handle result
          speechRecognition.onresult = (event: SpeechRecognitionEvent) => {
            for (let i = event.resultIndex; i < event.results.length; ++i) {
              if (event.results[i].isFinal) {
                dispatch({ type: "ADD_TRANSCRIPT", payload: " " + event.results[i][0].transcript });
              }
            }
            
          };
          // handle error
          speechRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
            toast.error("Speech recognition error detected: " + event.error);
          };
          // handle end
          speechRecognition.onend = () => {
          setIsRecording(false);
          setSpeechRecognition(null);
            toast.success("Speech recognition service disconnected.");
          };
        }
      }
    }
    return (
        
            <div className="border rounded-xl p-(--space-4) bg-(--surface)">
               <div className="flex flex-col items-center justify-center gap-(--space-4) my-(--space-12)">
                 <div className="">
                  <button ref={recordRef} onClick={handleClick} className="shadow-(--primary)"><Mic className="bg-primary p-3 rounded-full" color="white" size={60} /></button>
                 </div>
                 <div className="text-center">
                  {!isRecording ? <><h4>00:00</h4>
                  <p>Tap the mic to start recording</p></> : <> <Timer />
                  <p>Tap the mic to stop recording</p></>}
                 </div>
               </div>

              <div className="flex items-center justify-center gap-(--space-1) my-(--space-12)">
{                ([1,2,3,4,5,6,7,8,9,10].map((_, i) => (
                  <VoiceMeter key={i} isRecording={isRecording} />
                )))}
              </div>  
            </div> 
    )
}
export const recorder = memo(Recorder);

function Timer() {
  const [time, setTime] = useState(0);
  const timeString = () => {
        const minutes = Math.floor(time / (1000 * 60)) % 60;
        const seconds = Math.floor(time / 1000) % 60;
        const hours = Math.floor(time / (1000 * 60 * 60)) % 24;
        const minutesString = minutes < 10 ? `0${minutes}` : minutes;
        const secondsString = seconds < 10 ? `0${seconds}` : seconds;
        const hoursString = hours < 10 ? `0${hours}` : hours;
        if (hours > 0) {
            return `${hoursString}:${minutesString}:${secondsString}`;
        }
        return `${minutesString}:${secondsString}`;
    }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h4>{timeString()}</h4>
    </div>
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
      className="w-2 h-12 bg-primary "
      >  
    </motion.div>
  )
}

function getVolume() {
  return Math.random();
}

function startTranscript(setSpeechRecognition: (speechRecognition: SpeechRecognition) => void) {
  try {
    // 1. Initialize API with fallback for Safari
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Web Speech API is not supported in this browser.");
      return null;
    } else {
      const recognition = new SpeechRecognition();
      setSpeechRecognition(recognition);
      // 2. Configure Settings
      recognition.continuous = true;          // Keep listening after user pauses
      recognition.lang = 'en-US';              // Set transcription language

      recognition.onstart = () => {
        toast.success("Voice recognition active. Speak into the microphone.");
      };


      // 4. Control Recording
      recognition.start();
      return recognition;
      // To stop:  recognition.stop();
    }
  } catch (error) {
    toast.error("Error starting speech recognition: " + error);
    return null;
  }

}

function stopTranscript(speechRecognition: SpeechRecognition) {
  speechRecognition.stop();
}