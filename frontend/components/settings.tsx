"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, Settings as SettingsIcon, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getSettings } from "@/lib/api";
import { Loader } from "@/components/loader";
import { ActionDispatch, useEffect } from "react";
import { GeneralSettingsStateAction, SettingsState, SettingsStateAction } from "@/lib/types";


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

export function Settings({settingsState, dispatch, defaultSetting}: {settingsState: SettingsState, dispatch: ActionDispatch<[action: SettingsStateAction | GeneralSettingsStateAction]>, defaultSetting: boolean}) {
  const {data, isLoading, isSuccess} = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: Infinity,
    gcTime: Infinity,
  })
  useEffect(() => {
    if (isSuccess && defaultSetting) {
      dispatch({type: "SET_SETTINGS", payload: {tone: data.default_tone, length: data.default_length, audience: data.default_audience}})
    }
  }, [isSuccess, data, dispatch, defaultSetting])

  if (isLoading) return <Loader />
    return (
      <>
      <div className="flex items-center gap-(--space-2) mt-2 mb-4">
          <SettingsIcon className="text-primary" size={20} />
          <h4 className="">Reply settings</h4>
        </div>
        <div>
          {/* settings */}
          <div className="flex flex-wrap gap-(--space-4)">
            {settings.map((setting, index) => (
              <div key={index} className="flex-1 min-w-[200px]">
                <SettingItem key={index} setting={setting} value={settingsState[setting.label.toLowerCase() as keyof SettingsState]} onChange={dispatch} />
              </div>
            ))  }
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
    </>
    )
}

type SettingItemProps = {
  setting: SettingItems,
  value: string,
  onChange: ActionDispatch<[action: SettingsStateAction | GeneralSettingsStateAction]>
}
function SettingItem({setting, value, onChange}: SettingItemProps) {
  return (
    <div className="flex flex-col flex-1 max-w-2xs">
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