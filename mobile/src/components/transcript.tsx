import { AccentButton } from "./accent-button";
import { ThemedText } from "./themed-text";
import { TextInput, View } from "react-native";
import { ReplyStateAction } from "@/lib/types";
import { ActionDispatch } from "react";
import { Copy } from "./clipboard";
import { Button } from "./button";
import { KeyboardAvoidingView } from "react-native";

export function Transcript({editable, transcript, dispatch}: {editable: boolean, transcript: string, dispatch: ActionDispatch<[action: ReplyStateAction]>}) {
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <View className="border-border">
            <View className="flex-row items-center justify-between gap-1 p-3 bg-surface-muted rounded-t-lg">
                <View className="flex-row items-center gap-1">
                    <ThemedText type="subtitle">Transcription</ThemedText>
                    {editable && <AccentButton text="Editable" />}
                </View>
                {editable && <Button onPress={() => dispatch({ type: "CLEAR_TRANSCRIPT" })}>
                  Clear
                </Button>}
            </View>
            <View className="p-3 border border-border bg-surface rounded-b-lg">
                <TextInput style={{ textAlignVertical: 'top' }} className="min-h-50 p-3 bg-surface-muted border border-border rounded" multiline value={transcript} onChangeText={(text) => dispatch({ type: "SET_TRANSCRIPT", payload: text })}/>
            </View>
          </View>
        </KeyboardAvoidingView>
    )
}