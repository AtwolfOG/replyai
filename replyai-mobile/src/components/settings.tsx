import { ThemedText } from "./themed-text";
import { View } from "react-native";
import Lucide from "@react-native-vector-icons/lucide";
import { SettingItems } from "@/src/types/settings";
import { Button } from "./button";
import { Menu } from "@/components/ui/menu";

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


export function SettingsCard() {
    return (
       <View className="bg-surface gap-md p-xl rounded-xl">
          <View className="flex-row items-center gap-lg">
              <Lucide name="settings" size={24} color="#004ac6" />
              <ThemedText type="subtitle">Settings</ThemedText>
          </View>
          <View>
            {settings.map((setting) => (
              <Menu 
              placement="bottom"
              // trigger={({state, ...triggerProps}) => (
              //   <Button>
                  
              //   </Button>
              // )}
              >
                
              </Menu>
            ))}
          </View>
      </View>
    )
}