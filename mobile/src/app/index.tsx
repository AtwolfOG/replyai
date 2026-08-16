import { Button, CButton } from "@/components/button";
import Container from "@/components/container";
import Recoder from "@/components/recoder";
import { ThemedText } from "@/components/themed-text";
import Lucide from "@react-native-vector-icons/lucide";
import { TextInput, View } from "react-native";
import { Settings } from "@/components/settings";
import { useReducer } from "react";
import { ReplyState, ReplyStateAction } from "@/lib/types";
import { Switch } from "@/components/ui/switch";
import { Transcript } from "@/components/transcript";
import { Reply } from "@/components/reply";

export default function Home() {
    const [state, dispatch] = useReducer(reducer, {
        tone: "casual",
        length: "short",
        audience: "general",
        transcript: "",
        reply: ""
    });
    return (
        <Container>
            <View className="gap-8">
            
                {/* Recording Container */}
                <View className="items-center px-3 pt-12 pb-3 bg-surface dark:bg-surface-dark rounded-lg">
                    <View className="w-18 h-18 rounded-full bg-primary dark:bg-primary justify-center items-center">
                        <Lucide name="mic" size={32} className="text-primary-foreground! dark:text-primary-foreground!" />
                    </View>
                    <View className="gap-px items-center my-3">
                        <ThemedText type="subtitle">00:00</ThemedText>
                        <ThemedText type="small">Tap the mic to start recording</ThemedText>
                    </View>
                    <View>
                        <Recoder />
                    </View>
                </View>
            {/* Transcription */}
            <Transcript editable={true} transcript={state.transcript} dispatch={dispatch} />

            {/* Settings  */}
            <View className="bg-surface dark:bg-surface-dark gap-1 px-4 py-8 rounded-lg">
                <View className="flex-row items-center gap-2">
                    <Lucide name="settings" size={24} className="text-primary dark:text-primary" />
                    <ThemedText type="subtitle">Settings</ThemedText>
                </View>
            <Settings settingsState={state} dispatch={dispatch} defaultSetting={false} />

            <View className="flex-row items-center justify-between border border-border dark:border-border-dark p-3 rounded-lg bg-surface-muted dark:bg-surface-muted-dark opacity-80">
                <View className="flex-row items-center gap-2">
                    <Lucide name="shield-check" size={32} className="text-muted! dark:text-muted-dark!" />
                    <View>
                        <ThemedText type="default">Fact Check</ThemedText>
                        <ThemedText type="small">Fact check your replies</ThemedText>
                    </View>
                </View>
                <Switch isDisabled={true} isSelected={false} />
            </View>

            <View className="mt-4">
                <CButton className="bg-primary dark:bg-primary">
                    <View className="flex-row items-center gap-2">
                        <ThemedText className="text-primary-foreground! dark:text-primary-foreground!" type="default">Generate Reply</ThemedText><Lucide name="sparkles" size={24} className="text-primary-foreground! dark:text-primary-foreground!" />
                    </View>
                </CButton>
            </View>
            </View>

            {/* Reply */}
            <View>
                <Reply reply={state.reply} />
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