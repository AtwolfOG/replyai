import AccentButton from "@/src/components/accent-button";
import Button from "@/src/components/button";
import Container from "@/src/components/container";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/src/components/dropdown";
import Recoder from "@/src/components/recoder";
import { ThemedText } from "@/src/components/themed-text";
import Lucide from "@react-native-vector-icons/lucide";
import { Appearance, TextInput, View } from "react-native";
import { SettingsCard } from "@/src/components/settings";

export default function Home() {
    // Appearance.setColorScheme('light')
    const scheme = Appearance.getColorScheme();
    console.log(scheme);
    return (
        <Container>
            <View className="gap-4xl">
            
                {/* Recording Container */}
                <View className="items-center px-xl pt-5xl pb-xl bg-surface rounded-xl">
                    <View className="w-5xl h-5xl rounded-full bg-primary justify-center items-center">
                        <Lucide name="mic" size={24} color="#ffffff" />
                    </View>
                    <View className="gap-xs items-center my-xl">
                        <ThemedText type="subtitle">00:00</ThemedText>
                        <ThemedText type="small">Tap the mic to start recording</ThemedText>
                    </View>
                    <View>
                        <Recoder />
                    </View>
                </View>
            {/* Transcription */}
            <View className="border-border">
                <View className="flex-row items-center justify-between gap-md p-xl bg-surface-muted rounded-t-xl">
                    <View className="flex-row items-center gap-md">
                        <ThemedText type="subtitle">Transcription</ThemedText>
                        <AccentButton text="Editable" />
                    </View>
                    <Button onPress={() => {}}>
                        Copy
                    </Button>
                </View>
                <View className="p-xl border border-border bg-surface rounded-b-xl">
                    <TextInput className="min-h-[200px] p-xl bg-surface-muted border border-border rounded-lg" />
                </View>
            </View>

            {/* Settings  */}
            <SettingsCard />
        </View>
        </Container>
    );
}