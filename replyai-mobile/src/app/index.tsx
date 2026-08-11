import AccentButton from "@/components/accent-button";
import Button from "@/components/button";
import Container from "@/components/container";
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/dropdown";
import { ExternalLink } from "@/components/external-link";
import Recoder from "@/components/recoder";
import { ThemedText } from "@/components/themed-text";
import { defaultStyles } from "@/lib/styles";
import Lucide from "@react-native-vector-icons/lucide";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Home() {
    return (
        <Container>
            <View style={styles.container}>
            
                {/* Recording Container */}
                <View style={styles.recordingContainer}>
                    <View style={styles.micContainer}>
                        <Lucide name="mic" size={24} color={defaultStyles.colors.primaryForeground} />
                    </View>
                    <View style={styles.recordingTextContainer}>
                        <ThemedText type="subtitle">00:00</ThemedText>
                        <ThemedText type="small">Tap the mic to start recording</ThemedText>
                    </View>
                    <View>
                        <Recoder />
                    </View>
                </View>
            {/* Transcription */}
            <View style={styles.transcriptionContainer}>
                <View style={styles.transcriptionHeader}>
                    <View style={styles.transcriptionHeaderContent}>
                        <ThemedText type="subtitle">Transcription</ThemedText>
                        <AccentButton text="Editable" />
                    </View>
                    <Button onPress={() => {}}>
                        Copy
                    </Button>
                </View>
                <View style={styles.transcriptionInputContainer}>
                    <TextInput style={styles.transcriptionInput} />
                </View>
            </View>

            {/* Settings  */}
            <View style={styles.settingsContainer}>
                <View style={styles.settingsHeader}>
                    <Lucide name="settings" size={24} color={defaultStyles.colors.primary} />
                    <ThemedText type="subtitle">Settings</ThemedText>
                </View>
                <Dropdown>
                    <DropdownTrigger>
                        <ThemedText>Select Language</ThemedText>
                    </DropdownTrigger>
                    <DropdownContent>
                        <ThemedText type="body">English</ThemedText>
                        <ThemedText type="body">Spanish</ThemedText>
                        <ThemedText type="body">French</ThemedText>
                    </DropdownContent>
                </Dropdown>
            </View>
        </View>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: defaultStyles.spacing["4xl"],
    },
    recordingContainer: {
        alignItems: "center",
       paddingInline: defaultStyles.spacing.xl, 
       paddingTop: defaultStyles.spacing["5xl"],
       paddingBottom: defaultStyles.spacing.xl,
       backgroundColor: defaultStyles.colors.surface,
       borderRadius: defaultStyles.radius.xl,
       
    },
    micContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: defaultStyles.colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    recordingTextContainer: {
        gap: defaultStyles.spacing.xs,
        alignItems: "center",
        marginBlock: defaultStyles.spacing.xl
    },
    transcriptionContainer: {
        // gap: defaultStyles.spacing.xl,
        // borderWidth: 1,
        borderColor: defaultStyles.colors.border,
        // borderRadius: defaultStyles.radius.xl,
        // padding: defaultStyles.spacing.xl,
    },
    transcriptionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: defaultStyles.spacing.md,
        padding: defaultStyles.spacing.xl,
        backgroundColor: defaultStyles.colors.surfaceMuted,
        borderTopLeftRadius: defaultStyles.radius.xl,
        borderTopRightRadius: defaultStyles.radius.xl,
    },
    transcriptionHeaderContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: defaultStyles.spacing.md,
    },
    transcriptionInputContainer: {
        padding: defaultStyles.spacing.xl,
        borderWidth: 1,
        borderColor: defaultStyles.colors.border,
        backgroundColor: defaultStyles.colors.surface,
        borderBottomLeftRadius: defaultStyles.radius.xl,
        borderBottomRightRadius: defaultStyles.radius.xl,
    },
    transcriptionInput: {
        minHeight: 200,
        padding: defaultStyles.spacing.xl,
        backgroundColor: defaultStyles.colors.surfaceMuted,
        borderWidth: 1,
        borderColor: defaultStyles.colors.border,
        borderRadius: defaultStyles.radius.lg,
    },
    settingsContainer: {
        backgroundColor: defaultStyles.colors.surface,
        gap: defaultStyles.spacing.md,
        padding: defaultStyles.spacing.xl,
        borderRadius: defaultStyles.radius.xl,
    },
    settingsHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: defaultStyles.spacing.lg,
    }
})