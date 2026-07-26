"use client"
import Transition from "@/components/pageTransition"
import { useReducer } from "react";
import { Settings } from "./settings";
import { Reply } from "./reply";
import { recorder as Recorder } from "./recorder";
import { Transcript } from "./transcript";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { generateReply } from "@/lib/api";
import { ReplyState } from "./types";
import { GenerateReplyResponse } from "@/lib/types";
import { Loader } from "@/components/loader";

const testReply = `Hi Sarah,

After reviewing the Q3 performance data, I've concluded that we need to strategically realign our focus toward the enterprise segment. While our traction in the SMB market remains stable, the increasing churn rates suggest that our current high-touch model isn't sustainable for lower LTV accounts.

I’m proposing we implement a tiered account management framework. This will allow us to double down on our highest-value enterprise clients, ensuring they receive the specialized attention required for long-term retention and expansion, while automating more of the SMB journey.

Let's find 15 minutes tomorrow to discuss the logistics of this transition.

Best regards,
The Strategy Team`;


export default function Dashboard() {
  const [state, dispatch] = useReducer<ReplyState>(reducer, {
    tone: "casual",
    length: "short",
    audience: "general",
    language: "English",
    transcript: "",
    reply: "",
  });

  const mutation = useMutation({
    mutationFn: () => generateReply({
      tone: state.tone, 
      length: state.length, 
      audience: state.audience, 
      user_message: state.transcript
    }),
    onSuccess: (data: GenerateReplyResponse) => {
      dispatch({type: "SET_REPLY", payload: data.generated_reply})
    }
  })

    return (
      <Transition>
        <div >
          {mutation.isPending && <Loader overlay={true} fullscreen={true} />}
          <div className="grid lg:grid-cols-[1fr_0.5fr] gap-4 p-(--space-6) bg-(--surface-muted)">
            <div className="flex flex-col gap-(--space-12)">
            {/* recording section */}
            <Recorder dispatch={dispatch}/>
            {/* transcript section */}
            <Transcript transcript={state.transcript} dispatch={dispatch}/>
            </div>

            <div className="flex flex-col gap-(--space-12)">
            {/* reply settings section */}
            <div className="border rounded-xl px-(--space-4) bg-(--surface)">
              <div className="p-(--space-4)">
                <Settings settingsState={state} dispatch={dispatch} />
                <div>
                  <Button className="w-full cursor-pointer bg-primary text-primary-foreground py-(--space-6)" variant="outline" onClick={() => mutation.mutate()}>Generate Reply <Sparkles /></Button>
                </div>
              </div>
            </div>

            {/* reply section */}
            <div className="border rounded-xl  bg-(--surface)">
              <Reply reply={state.reply} />
            </div>
            </div>
          </div> 
        </div>
      </Transition>
    )
}

function reducer(state, action) {
  switch (action.type) {
    case "SET_SETTINGS":
      return { ...state, ...action.payload };
    case "SET_TONE":
      return { ...state, tone: action.payload };
    case "SET_LENGTH":
      return { ...state, length: action.payload };
    case "SET_TARGET_AUDIENCE":
      return { ...state, targetAudience: action.payload };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "SET_TRANSCRIPT":
      return { ...state, transcript: action.payload };
    case "SET_REPLY":
      return { ...state, reply: action.payload };
      case "ADD_TRANSCRIPT":
        return { ...state, transcript: state.transcript + action.payload };
    case "CLEAR_TRANSCRIPT":
      return { ...state, transcript: "" };
    default:
      return state;
  }
}