import { SettingsState } from "@/lib/types";
import { CButton } from "@/components/button";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "@/components/ui/menu";
import { View } from "react-native";
import { ThemedText } from "./themed-text";
import Lucide from "@react-native-vector-icons/lucide";
import { cn } from "@/lib/utils";

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
  return (
      <View className="gap-4 my-4">
        {settings.map((setting) => (
          <View key={setting.label} className="gap-2">
            <ThemedText type="small">{setting.label}</ThemedText>
            <SettingItem setting={setting} value={settingsState[setting.label.toLowerCase() as keyof SettingsState]} onChange={dispatch} />
          </View>
      ))}
      </View>
  );
}

function SettingItem({setting, onChange, value}: {setting: SettingItems, onChange: ActionDispatch<[action: SettingsStateAction | GeneralSettingsStateAction]>, value: string}) {
  return (
    <Menu 
    placement="bottom" 
    offset={15}
    selectedKeys={[value]}
    disabledKeys={[value]}
    selectionMode="single"
    onSelectionChange={(keys) => {
      switch (setting.actionType) {
    case "SET_TONE":
      onChange({
        type: "SET_TONE",
        payload: [...keys][0] as SettingsState["tone"],
      });
      break;

    case "SET_LENGTH":
      onChange({
        type: "SET_LENGTH",
        payload: [...keys][0] as SettingsState["length"],
      });
      break;

    case "SET_AUDIENCE":
      onChange({
        type: "SET_AUDIENCE",
        payload: [...keys][0] as SettingsState["audience"],
      });
      break;
  }
    }}
    closeOnSelect={true}
    trigger={(triggerProps, {open}) => <CButton {...triggerProps} className="px-4" >
      <View className="flex-row items-center justify-between w-full">
        <ThemedText type="default">{value}</ThemedText> 
        <Lucide name="chevron-down" size={24} className={cn("text-muted! transition-transform duration-200", open && "rotate-180")} />
      </View>
    </CButton>}
    >
        {setting.options.map((option) => (
    <MenuItem key={option} textValue={option} className={cn("px-4", value === option && "bg-accent opacity-100!")}>
            <MenuItemLabel size="default">{option}</MenuItemLabel>
        </MenuItem>
        ))}
    </Menu>
  );
}