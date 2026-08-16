import Container from "@/components/container";
import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Lucide from "@react-native-vector-icons/lucide";
import { ThemedText } from "@/components/themed-text";
import { AccentButton } from "@/components/accent-button";
import { Copy } from "@/components/clipboard";
import { CButton } from "@/components/button";
import { Transcript } from "@/components/transcript";
import { Reply } from "@/components/reply";
import { Settings } from "@/components/settings";
import { Switch } from "@/components/ui/switch";
import { useReducer } from "react";
import { ReplyState, ReplyStateAction } from "@/lib/types";

export default function HistoryId() {
    const router = useRouter();
    const [state, dispatch] = useReducer(reducer, {
        tone: "casual",
        length: "short",
        audience: "general",
        transcript: "",
        reply: ""
    });
    return (
        <Container>
          <Pressable onPress={() => router.back()} className="flex-row items-center gap-2">
            <Lucide name="arrow-left" size={20} />
            <ThemedText type="default">Back</ThemedText>
          </Pressable>

          <View className="mt-4">
            <ThemedText type="title">Reply Detail</ThemedText>
            <ThemedText type="small">{new Date().toLocaleString()}</ThemedText>
          </View>
          <View className="flex-row items-center flex-wrap gap-2 my-2">
            <AccentButton text="formal" />
            <AccentButton text="medium" />
            <AccentButton text="general" />
          </View>
          <View className="flex-row items-center gap-2 my-2">
            <Copy text="Hello, how are you?" />
            <CButton className="flex-row items-center gap-2">
              <Lucide name="trash-2" size={20} className="text-destructive!"/>
              <ThemedText type="default">Delete</ThemedText>
            </CButton>
          </View>

            <View className="my-4">
              <Transcript editable={false} transcript="Hello, how are you?"  />
            </View>

            <View className="my-4">
              <Reply reply="Hello, how are you?" />
            </View>

            <View className="my-4 border border-border rounded-lg p-4">
              <View className="flex-row items-center gap-2">
                <Lucide name="settings" size={24} className="text-primary" />
                <ThemedText type="subtitle">Settings</ThemedText>
              </View>
              <Settings defaultSetting={false} settingsState={state} dispatch={dispatch} />
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
            </View>
        </Container>
    );
}

function reducer(state: ReplyState, action: ReplyStateAction): ReplyState {
      switch (action.type) {
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
        default:
            return state;
      }
}