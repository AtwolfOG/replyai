import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, Settings as SettingsIcon, ShieldCheck, Sparkles } from "lucide-react";
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
  {
    label: "LANGUAGE",
    options: ["English", "Spanish", "French"],
    value: "English",
  },
]

export function Settings({settingsState, dispatch}: {settingsState: SettingsReducer, dispatch: (action: {type: string, payload: string}) => void}) {
    return (
        <div className="p-(--space-4)">
            <div className="flex items-center gap-(--space-2) mt-2 mb-4">
                <SettingsIcon className="text-primary" size={20} />
                <h4 className="">Reply settings</h4>
              </div>
              <div>
                {/* settings */}
                <div className="flex flex-wrap gap-(--space-4)">
                  {settings.map((setting, index) => (
                    <div key={index} className="flex-1 min-w-[200px]">
                      <SettingItem key={index} label={setting.label} options={setting.options} value={settingsState[setting.label.toLowerCase() as keyof SettingsReducer]} onChange={dispatch} />
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
              <div>
                <Button className="w-full cursor-pointer bg-primary text-primary-foreground py-(--space-6)" variant="outline">Generate Reply <Sparkles /></Button>
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