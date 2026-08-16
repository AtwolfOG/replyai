import { Text, View, TextInput } from "react-native";
import Container from "@/components/container";
import { Button, CButton } from "@/components/button";
import { useReducer, useState } from "react";
import { Settings } from "@/components/settings";
import { ReplyState, ReplyStateAction } from "@/types";
import { Reply } from "@/lib/types";
import { AccentButton } from "@/components/accent-button";
import { ThemedText } from "@/components/themed-text";
import Lucide from "@react-native-vector-icons/lucide";
import { Copy } from "@/components/clipboard";
import { useRouter } from "expo-router";

const data: Reply[] = [
    {
        id: "123",
        transcript: "Hello, how are you?",
        generated_reply: "I'm fine, thank you!",
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
        tone: "formal",
        length: "medium",
        audience: "general",
    }
]

export default function History() {
    const [open, setOpen] = useState(false);
    const [settingsState, dispatch] = useReducer(reducer, {
        audience: "general",
        tone: "formal",
        length: "medium",
    });
    return (  
        <Container>
        
        <TextInput placeholder="Search" className="border-b border-border rounded p-2" />
        
        <Settings settingsState={settingsState} dispatch={dispatch} />
        {data.map((item) => (
            <HistoryItem key={item.id} item={item} />
        ))}
        </Container>
    );
}

function HistoryItem({item}: {item: Reply}) {
    const router = useRouter();
    return (
        <View className="border border-border rounded p-4">
            <View className="flex-row items-center justify-between">
                <ThemedText type="small">{item.created_at}</ThemedText>
            </View>
            <View className="flex-row flex-wrap my-2 items-center gap-2">
                <AccentButton text={item.tone} />
                <AccentButton text={item.length} />
                <AccentButton text={item.audience} />
            </View>
            <ThemedText className="mt-2 mb-4" type="small">{item.generated_reply}</ThemedText>
            <View className="border-t border-border"/>
            <View className="flex-row items-center gap-2 mt-2">
                <CButton className="flex-row flex-6/8 items-center gap-2 bg-primary" onPress={() => router.push(`/history/${item.id}`)}>
                    <ThemedText type="small" className="text-primary-foreground">View Reply</ThemedText>
                    <Lucide name="square-arrow-out-up-right" size={20} color="white" />
                </CButton>
                <Copy text={item.generated_reply} icon />
                <CButton className="items-center gap-2 bg-destructive" onPress={() => {}}>
                    <Lucide name="trash-2" size={20} color="white" />
                </CButton>
            </View>
        </View>
    )
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