"use client"
import { Loader } from "@/components/loader";
import { Reply } from "@/components/reply";
import { RotatingBtn } from "@/components/rotatingbtn";
import { Settings } from "@/components/settings";
import { Transcript } from "@/components/transcript";
import { Button } from "@/components/ui/button";
import { getReplyById } from "@/lib/api";
import { copyToClipboard } from "@/lib/copytoclipboard";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Copy, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useReducer } from "react";
import { ReplyState } from "./types";

export default function Page() {
  const {id} = useParams();
  const [state, dispatch] = useReducer<ReplyState>(reducer, {
    tone: "casual",
    length: "short",
    audience: "general",
    language: "English",
    transcript: "",
    reply: "",
  });

  const {data, isLoading, isError } = useQuery({
    queryKey: ["reply", id],
    queryFn: () => getReplyById(id as string),
    staleTime: Infinity,
    gcTime: Infinity,
  })
  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_TRANSCRIPT", payload: data.transcript });
      dispatch({ type: "SET_REPLY", payload: data.generated_reply });
      dispatch({ type: "SET_SETTINGS", payload: { tone: data.tone, length: data.length, audience: data.audience } })
    }
  }, [data])
    return (
        <div>
          <div className="px-(--space-4) py-(--space-2)">
            <Button className="flex items-center gap-(--space-2) group text-muted hover:text-primary! transition-all duration-300"> <ArrowLeft className="group-hover:-translate-x-1 transition-all duration-300" /> Back</Button>
          </div>
          {isLoading && <Loader />}
          {isError && <div className="flex items-center justify-center">Error</div>}

          {data && <div className="px-(--space-6) ">
            <div className="grid lg:grid-cols-[1fr_0.5fr] gap-4 p-(--space-6) bg-(--surface-muted)">
              <div>
                <div className="flex items-center justify-between flex-wrap gap-(--space-8)">
                  <div>
                    <h3>Reply Detail</h3>
                    <div className="flex items-center gap-(--space-4) flex-wrap">
                      <small>{new Date(data.created_at).toLocaleString()}</small>
                      <div className="flex items-center gap-(--space-2)">
                        <RotatingBtn>{data.tone}</RotatingBtn>
                        <RotatingBtn>{data.length}</RotatingBtn>
                        <RotatingBtn>{data.audience}</RotatingBtn>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-(--space-2)">
                    <Button onClick={() => copyToClipboard(data.generated_reply)} variant="outline"><Copy /> Copy</Button>
                    <Button variant="outline"><Trash2 className="text-destructive" /> Delete</Button>
                  </div>
                </div>
                <div className="flex flex-col gap-(--space-4) my-(--space-8)">
                  <Transcript transcript={data.transcript} dispatch={dispatch} />
                  <div className="border rounded-xl bg-(--surface)">
                    <Reply reply={data.generated_reply} />
                  </div>
                </div>
              </div>
              <div>
                <div className="border rounded-xl bg-(--surface) p-(--space-6)">
                  <Settings settingsState={state} dispatch={dispatch} defaultSetting={false} />
                </div>
              </div>
            </div>
            
          </div>}
        </div>
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