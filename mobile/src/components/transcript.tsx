import { AccentButton } from "./accent-button";
import { ThemedText } from "./themed-text";
import { TextInput, View } from "react-native";
import { ReplyStateAction } from "@/lib/types";
import { ActionDispatch } from "react";
import { Copy } from "./clipboard";
import { Button } from "./button";
import { KeyboardAvoidingView } from "react-native";

export function Transcript({editable, transcript, dispatch}: {editable: boolean, transcript: string, dispatch?: ActionDispatch<[action: ReplyStateAction]>}) {
    return (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}>
          <View className="border-border dark:border-border-dark">
            <View className="flex-row items-center justify-between gap-1 p-3 bg-surface-muted dark:bg-surface-muted-dark rounded-t-lg">
                <View className="flex-row items-center gap-1">
                    <ThemedText type="subtitle">Transcription</ThemedText>
                    {editable && <AccentButton text="Editable" />}
                </View>
                {editable && <Button onPress={() => dispatch({ type: "CLEAR_TRANSCRIPT" })}>
                  Clear
                </Button>}
            </View>
            <View className="p-3 border border-border dark:border-border-dark bg-surface dark:bg-surface-dark rounded-b-lg">
                <TextInput style={{ textAlignVertical: 'top' }} className="min-h-50 p-3 text-text-body dark:text-text-body-dark bg-surface-muted dark:bg-surface-muted-dark border border-border dark:border-border-dark rounded" multiline value={transcript} onChangeText={(text) => dispatch({ type: "SET_TRANSCRIPT", payload: text })}/>
            </View>
          </View>
        </KeyboardAvoidingView>
    )
}