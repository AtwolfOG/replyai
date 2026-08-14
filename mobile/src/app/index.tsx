import AccentButton from "@/src/components/accent-button";
import Button from "@/src/components/button";
import Container from "@/src/components/container";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/src/components/dropdown";
import Recoder from "@/src/components/recoder";
import { ThemedText } from "@/src/components/themed-text";
import Lucide from "@react-native-vector-icons/lucide";
import { TextInput, View } from "react-native";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "@/src/components/ui/menu";

export default function Home() {
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
            <View className="bg-surface gap-1 p-3 rounded-lg">
                <View className="flex-row items-center gap-2">
                    <Lucide name="settings" size={24} className="text-primary" />
                    <ThemedText type="subtitle">Settings</ThemedText>
                </View>
                <Dropdown>
                    <DropdownTrigger>
                        <ThemedText>Select Language</ThemedText>
                    </DropdownTrigger>
                    <DropdownContent>
                        <ThemedText type="default">English</ThemedText>
                        <ThemedText type="default">Spanish</ThemedText>
                        <ThemedText type="default">French</ThemedText>
                    </DropdownContent>
                </Dropdown>

                <Menu placement="top" trigger={(triggerProps) => {console.log(triggerProps);return<Button {...triggerProps}>Select Language</Button>}}>
                        <MenuItem key="English" textValue="English">
                            {/* <Lucide name="plugins" size={24} className="text-primary" /> */}
                            <MenuItemLabel size="default">English</MenuItemLabel>
                        </MenuItem>
                        <MenuItem key="Spanish" textValue="Spanish">
                            {/* <Lucide name="plugins" size={24} className="text-primary" /> */}
                            <MenuItemLabel size="default">Spanish</MenuItemLabel>
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem key="French" textValue="French">
                            {/* <Lucide name="plugins" size={24} className="text-primary" /> */}
                            <MenuItemLabel size="default">French</MenuItemLabel>
                        </MenuItem>
                </Menu>
            </View>
        </View>
        </Container>
    );
}