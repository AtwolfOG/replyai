"use client"
import Transition from "@/components/pagetransition"
import { useReducer } from "react";
import { Settings } from "@/components/settings";
import { Reply } from "@/components/reply";
import { recorder as Recorder } from "./recorder";
import { Transcript } from "@/components/transcript";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { generateReply } from "@/lib/api";
import { ReplyState, ReplyStateAction } from "@/lib/types";
import { GenerateReplyResponse } from "@/lib/types";
import { Loader } from "@/components/loader";
import { copyToClipboard } from "@/lib/copytoclipboard";

export default function Dashboard() {
  const [state, dispatch] = useReducer(reducer, {
    tone: "casual",
    length: "short",
    audience: "general",
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
      copyToClipboard(data.generated_reply)
    }
  })

    return (
      <Transition>
        <div>
          {mutation.isPending && <Loader overlay={true} fullscreen={true} />}
          <div className="grid lg:grid-cols-[1fr_0.5fr] gap-4 bg-(--surface-muted)">
            <div className="flex flex-col gap-(--space-12)">
            {/* recording section */}
            <Recorder dispatch={dispatch}/>
            {/* transcript section */}
            <Transcript transcript={state.transcript} dispatch={dispatch} editable/>
            </div>

            <div className="flex flex-col gap-(--space-12)">
            {/* reply settings section */}
            <div className="border rounded-xl px-(--space-4) bg-(--surface)">
              <div className="p-(--space-4)">
                <Settings settingsState={state} dispatch={dispatch} defaultSetting={true} />
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

function reducer(state: ReplyState, action: ReplyStateAction) {
  switch (action.type) {
    case "SET_SETTINGS":
      return { ...state, ...action.payload };
    case "SET_TONE":
      return { ...state, tone: action.payload };
    case "SET_LENGTH":
      return { ...state, length: action.payload };
    case "SET_AUDIENCE":
      return { ...state, audience: action.payload };
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