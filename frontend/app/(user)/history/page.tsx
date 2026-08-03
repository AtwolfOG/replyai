"use client"
import Transition from "@/components/pagetransition"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Copy, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { ActionDispatch, useReducer } from "react";
import { useQuery } from "@tanstack/react-query";
import { Reply, SettingsState, SettingsStateAction } from "@/lib/types";
import { getReplies } from "@/lib/api";
import { Loader } from "@/components/loader";
import { useRouter } from "next/navigation";
import { copyToClipboard } from "@/lib/copytoclipboard";

type SettingItems =  {
      label: "TONE";
      options: SettingsState["tone"][];
      value: SettingsState["tone"];
      actionType: "SET_TONE";
    }
  | {
      label: "LENGTH";
      options: SettingsState["length"][];
      value: SettingsState["length"];
      actionType: "SET_LENGTH";
    }
  | {
      label: "AUDIENCE";
      options: SettingsState["audience"][];
      value: SettingsState["audience"];
      actionType: "SET_AUDIENCE";
    };

const settings: SettingItems[] = [
  {
    label: "TONE",
    options: ["casual", "friendly", "professional", "educational", "humorous", "persuasive"],
    value: "casual",
    actionType: "SET_TONE"
  },
  {
    label: "AUDIENCE",
    options: ["general", "student", "developer", "professional", "academic", "social media"],
    value: "general",
    actionType: "SET_AUDIENCE"
  },
  {
    label: "LENGTH",
    options: ["short", "medium", "long"],
    value: "short",
    actionType: "SET_LENGTH"
  },
]

export default function History() {
  const [settingsState, dispatch] = useReducer(reducer, {
    tone: "casual",
    length: "short",
    audience: "general",
  });
  const {data, isLoading, error, isError, refetch} = useQuery<Reply[]>({
    queryKey: ["history"],
    queryFn: () => getReplies(),
    staleTime: Infinity,
    gcTime: Infinity,
  })
    return (
      <Transition>
        <div>
          <div>
            <div>
              <div className="flex flex-wrap gap-(--space-8) items-center justify-between my-(--space-4)">
                <div>
                  <h2>Generation History</h2>
                  <p>Manage your email history</p>
                </div>
                <div className="min-w-3xs max-w-md flex-1">
              <input type="text" placeholder="Search" className="w-full"  />
                </div>
              </div>
            <div className="my-(--space-6)">
                {/* settings */}
                <div className="flex flex-wrap gap-(--space-4)">
                  {settings.map((setting, index) => (
                    <div key={index} className="flex-1 min-w-[200px] max-w-2xs w-full">
                      <SettingItem key={index} value={settingsState[setting.label.toLowerCase() as keyof SettingsState]} setting={setting} onChange={dispatch} />
                    </div>
                  ))  }
               </div>
            </div>
            <div>
              {isLoading && <Loader overlay={false} fullscreen={false} />}
              {isError && <div>
                <p>Error: {error.message}</p>
                <Button onClick={() => refetch()}>Retry</Button>
              </div>}
              {data && 
              data.length > 0 ?
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,350px))] gap-(--space-4) py-(--space-6) justify-center">
                {data.map((item, index) => (
                  <HistoryItem key={index} item={item} index={index} />
                ))}
              </div> : 
              <div className="flex items-center justify-center h-full py-(--space-6)">
                <p>No history found</p>
              </div>
              }
            </div>
            </div>
          </div>
        </div>
      </Transition>
    )
}


type SettingItemProps = {
  setting: SettingItems,
  value: string,
  onChange: ActionDispatch<[action: SettingsStateAction]>
}
function SettingItem({setting, value, onChange}: SettingItemProps) {
  return (
    <div className="flex flex-col flex-1">
      <small className="w-max">{setting.label}</small>
      <div className="flex items-center gap-(--space-2)">
        <DropdownMenu>
  <DropdownMenuTrigger render={<Button className="flex w-full justify-between gap-(--space-2)" variant="outline" />}>
    {value} <ChevronDown size={20} />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>{setting.label}</DropdownMenuLabel>
      {setting.options.map((option, index) => (
        <DropdownMenuItem  className={option === value ? "bg-foreground/70 text-primary-foreground" : ""} key={index} onClick={() => {
          switch (setting.actionType) {
    case "SET_TONE":
      onChange({
        type: "SET_TONE",
        payload: option as SettingsState["tone"],
      });
      break;

    case "SET_LENGTH":
      onChange({
        type: "SET_LENGTH",
        payload: option as SettingsState["length"],
      });
      break;

    case "SET_AUDIENCE":
      onChange({
        type: "SET_AUDIENCE",
        payload: option as SettingsState["audience"],
      });
      break;
  }

        }}>{option}</DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
      </div>
    </div>
  )
}

function HistoryItem({item, index}: {item: Reply, index: number}) {
  const router = useRouter();
  const time = new Date(item.created_at).toLocaleString();
  return (
    <div key={index} className="flex flex-col border rounded-xl p-(--space-4) bg-background">
        <p className="text-sm">{time}</p>
      <div className="flex items-center gap-(--space-2) my-(--space-2)">

        <small className="bg-primary/30 text-primary! text-sm! p-(--space-1) rounded-md">Editable</small>
        {/* <small className="bg-primary/30 text-primary! text-sm! p-(--space-1) rounded-md">Fact checked</small> */}
      </div>
      <p className="line-clamp-3 flex-1">{item.generated_reply}</p>
      <div className="w-full h-0.5 border mt-(--space-12)"></div>
      <div className="flex items-center gap-(--space-2) justify-self-end mt-(--space-2)">
        <Button className="flex-1 cursor-pointer bg-primary/90 hover:bg-primary duration-300 text-primary-foreground py-(--space-6)" variant="outline" onClick={() => {router.push(`/history/${item.id}`)}}>View Reply <SquareArrowOutUpRight size={20} /></Button>
        <Button className="cursor-pointer" onClick={() => {copyToClipboard(item.generated_reply)}} variant="outline"><Copy size={20} /></Button>
        <Button className="cursor-pointer text-background" variant="destructive"><Trash2 size={20} /></Button>
      </div>
    </div>
  )
}

function reducer(state: SettingsState, action: SettingsStateAction) {
  switch (action.type) {
    // case "SET_SETTINGS":
    //   return { ...state, ...action.payload };
    case "SET_TONE":
      return { ...state, tone: action.payload };
    case "SET_LENGTH":
      return { ...state, length: action.payload };
    case "SET_AUDIENCE":
      return { ...state, targetAudience: action.payload };
    default:
      return state;
  }
}