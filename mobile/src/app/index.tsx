import AccentButton from "@/src/components/accent-button";
import { Button, CButton } from "@/src/components/button";
import Container from "@/src/components/container";
import Recoder from "@/src/components/recoder";
import { ThemedText } from "@/src/components/themed-text";
import Lucide from "@react-native-vector-icons/lucide";
import { TextInput, View } from "react-native";
import { Settings } from "@/src/components/settings";
import { useReducer } from "react";
import { ReplyState, ReplyStateAction } from "@/src/lib/types";
import { Switch } from "@/src/components/ui/switch";

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
                <View className="items-center px-3 pt-12 pb-3 bg-surface rounded-lg">
                    <View className="w-18 h-18 rounded-full bg-primary justify-center items-center">
                        <Lucide name="mic" size={32} className="text-primary-foreground!" />
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
            <View className="border-border">
                <View className="flex-row items-center justify-between gap-1 p-3 bg-surface-muted rounded-t-lg">
                    <View className="flex-row items-center gap-1">
                        <ThemedText type="subtitle">Transcription</ThemedText>
                        <AccentButton text="Editable" />
                    </View>
                    <Button onPress={() => {}}>
                        Copy
                    </Button>
                </View>
                <View className="p-3 border border-border bg-surface rounded-b-lg">
                    <TextInput style={{ textAlignVertical: 'top' }} className="min-h-[200px] p-3 bg-surface-muted border border-border rounded" multiline />
                </View>
            </View>

            {/* Settings  */}
            <View className="bg-surface gap-1 px-4 py-8 rounded-lg">
                <View className="flex-row items-center gap-2">
                    <Lucide name="settings" size={24} className="text-primary" />
                    <ThemedText type="subtitle">Settings</ThemedText>
                </View>
            <Settings settingsState={state} dispatch={dispatch} defaultSetting={false} />

            <View className="flex-row items-center justify-between border border-border p-3 rounded-lg bg-surface-muted opacity-80">
                <View className="flex-row items-center gap-2">
                    <Lucide name="shield-check" size={32} className="text-muted!" />
                    <View>
                        <ThemedText type="default">Fact Check</ThemedText>
                        <ThemedText type="small">Fact check your replies</ThemedText>
                    </View>
                </View>
                <Switch isDisabled={true} isSelected={false} />
            </View>

            <View className="my-4">
                <CButton className="bg-primary">
                    <View className="flex-row items-center gap-2">
                        <ThemedText className="text-primary-foreground!" type="default">Generate Reply</ThemedText> <Lucide name="sparkles" size={24} className="text-primary-foreground!" />
                    </View>
                </CButton>
            </View>
               
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