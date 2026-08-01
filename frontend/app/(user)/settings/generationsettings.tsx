"use client"
import { Copy, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/lib/api";
import { Loader } from "@/components/loader";
import { useEffect, useReducer } from "react";

type SettingsReducer = {
  tone: string;
  length: string;
  audience: string;
  language: string;
}

const settings = [
  {
    label: "TONE",
    options: ["casual", "friendly", "professional", "educational", "humorous", "persuasive"],
    value: "casual",
  },
  {
    label: "AUDIENCE",
    options: ["general", "student", "developer", "professional", "academic", "social media"],
    value: "general",
  },
  {
    label: "LENGTH",
    options: ["short", "medium", "long"],
    value: "short",
  },
  // {
  //   label: "LANGUAGE",
  //   options: ["English", "Spanish", "French"],
  //   value: "English",
  // },
]

export function GenerationSettings() {
  const [state, dispatch] = useReducer<SettingsReducer>(reducer, {
    tone: "",
    length: "",
    audience: "",
    // language: "",
    autoCopy: false,
  })
  const {data, isLoading, isSuccess, isError, refetch} = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  useEffect(() => {
    if (isSuccess) {
      dispatch({type: "SET_SETTINGS", payload: {tone: data.default_tone, length: data.default_length, audience: data.default_audience}})
    }
  }, [isSuccess, data, dispatch])

  if (isLoading) return <Loader />
  if (isError) return <div>
        <p>Something went wrong</p>
        <button onClick={() => refetch()}>Retry</button>
        </div>
    return (
      <div className="flex flex-col gap-(--space-2) max-w-2xl self-center my-(--space-12)">
        <div className="flex items-center gap-(--space-4)">
            <SlidersHorizontal className="text-primary" /> 
            <h3>Generation Defaults</h3>
        </div>

        <div>
          {/* settings */}
          <div className="flex flex-wrap gap-(--space-4)">
            {settings.map((setting, index) => (
              <div key={index} className="flex-1 min-w-[200px]">
                <SettingItem key={index} label={setting.label} options={setting.options} value={state[setting.label.toLowerCase() as keyof SettingsReducer]} onChange={dispatch} />
              </div>
            ))  }
          </div>

             <div className="flex items-center justify-between my-4 bg-(--surface-muted) p-(--space-2) rounded-xl border gap-(--space-2) opacity-80">
            <div className="flex items-center gap-(--space-2)">
              <Copy size={32} />
              <div className="flex flex-col">
                <p>Auto copy</p>
                <small>copy to clipboard on finish</small>
              </div>
            </div>
              <Switch onCheckedChange={(checked) => dispatch({type: "SET_AUTO_COPY", payload: checked})} size="default"/>
          </div>
          
          <div className="flex items-center justify-between my-4 bg-(--surface-muted) p-(--space-2) rounded-xl border gap-(--space-2) cursor-not-allowed opacity-80">
            <div className="flex items-center gap-(--space-2)">
              <ShieldCheck size={32} />
              <div className="flex flex-col">
                <p>Fact-check</p>
                <small>Fact-check your replies</small>
              </div>
            </div>
              <Switch disabled size="default"/>
          </div>
        </div>
    </div>
    )
}

function SettingItem({label, options, value, onChange}: {label: string, options: string[], value: string, onChange: (value: string) => void}) {
  return (
    <div className="flex flex-col flex-1">
      <small className="w-max">{label}</small>
      <div className="flex items-center gap-(--space-2)">
        <DropdownMenu>
  <DropdownMenuTrigger render={<Button className="flex w-full justify-between gap-(--space-2)" variant="outline" />}>
    {value} <ChevronDown size={20} />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>{label}</DropdownMenuLabel>
      {options.map((option, index) => (
        <DropdownMenuItem  className={option === value ? "bg-foreground/70 text-primary-foreground" : ""} key={index} onClick={() => onChange({type: `SET_${label}`, payload: option})}>{option}</DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
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
    case "SET_AUTO_COPY":
      return { ...state, autoCopy: action.payload };
    default:
      return state;
  }
}