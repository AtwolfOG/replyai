"use client"
import Transition from "@/components/pageTransition"
import { useReducer } from "react";
import { Settings } from "./settings";
import { Reply } from "./reply";
import { recorder as Recorder } from "./recorder";
import { Transcript } from "./transcript";

const testReply = `Hi Sarah,

After reviewing the Q3 performance data, I've concluded that we need to strategically realign our focus toward the enterprise segment. While our traction in the SMB market remains stable, the increasing churn rates suggest that our current high-touch model isn't sustainable for lower LTV accounts.

I’m proposing we implement a tiered account management framework. This will allow us to double down on our highest-value enterprise clients, ensuring they receive the specialized attention required for long-term retention and expansion, while automating more of the SMB journey.

Let's find 15 minutes tomorrow to discuss the logistics of this transition.

Best regards,
The Strategy Team`;

type ReplyState = {
  tone: string;
  length: string;
  audience: string;
  language: string;
  transcript: string;
  reply: string;
}

export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, {
    tone: "casual",
    length: "short",
    audience: "general",
    language: "English",
    transcript: "",
    reply: "",
  });

    return (
      <Transition>
        <div>
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
              <Settings settingsState={state} dispatch={dispatch} />
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