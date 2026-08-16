import { Image, Text, View } from "react-native";
import Container from "@/components/container";
import { ThemedText } from "@/components/themed-text";
import Lucide from "@react-native-vector-icons/lucide";
import { Settings } from "@/components/settings";
import { useReducer } from "react";
import { ReplyState, ReplyStateAction } from "@/types";
import { Switch } from "@/components/ui/switch";

export default function History() {
    const [settingsState, dispatch] = useReducer(reducer, {
        audience: "general",
        tone: "formal",
        length: "medium",
    });
    return (
        <Container>
        <View className="pt-20">
            <View className="items-center gap-2">
                <View className="border border-border rounded-full overflow-hidden">
                    <Image source={require("../../assets/images/icon.png")} className="w-20 h-20" />
                </View>
                <ThemedText type="title">Ayokunle Adedapo</ThemedText>
                <ThemedText type="default">ayokunletestimony702@gmail.com</ThemedText>
            </View>

            <View className="mt-10 p-2">
                <View className="flex-row items-center gap-2">
                    <Lucide name="sliders-horizontal" size={20} className="text-primary!" />
                    <ThemedText type="subtitle">Generation Defaults</ThemedText>
                </View>
                <Settings settingsState={settingsState} dispatch={dispatch} defaultSetting={true} />
            </View>


            <View className="my-2 flex-row items-center justify-between border border-border p-3 rounded-lg bg-surface">
                <View className="flex-row items-center gap-2">
                    <Lucide name="copy" size={32} className="text-muted!" />
                    <View>
                        <ThemedText type="default">Auto copy</ThemedText>
                        <ThemedText type="small">Auto copy reply to clipboard</ThemedText>
                    </View>
                </View>
                <Switch isSelected={false} />
            </View>

            <View className="flex-row items-center justify-between border border-border p-3 rounded-lg bg-surface opacity-80">
                <View className="flex-row items-center gap-2">
                    <Lucide name="shield-check" size={32} className="text-muted!" />
                    <View>
                        <ThemedText type="default">Fact Check</ThemedText>
                        <ThemedText type="small">Fact check your replies</ThemedText>
                    </View>
                </View>
                <Switch isDisabled={true} isSelected={false} />
            </View>
            
        </View>
        </Container>
    );
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
    default:
      return state;
  }
}