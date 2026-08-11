import { StyleSheet, View } from "react-native";
import { defaultStyles } from "@/lib/styles";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

export default function Recoder() {
    return (
        <View style={styles.container}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Bar key={index} isRecording={true} />
          ))}
        </View>
    )
}

function Bar({isRecording}: {isRecording: boolean}) {
  const scaleY = useSharedValue(getRandomScale());
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        scaleY.value = withSpring(getRandomScale());
      }, 150);
      return () => clearInterval(interval);
    }
  }, [isRecording]);
    return (
        <Animated.View style={[styles.bar, { transform: [{ scaleY }] }]}></Animated.View>
    )
}

function getRandomScale() {
  let scale = Math.random();
  if (scale < 0.3) {
    scale = 0.3;
  }
  return scale;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: defaultStyles.spacing.xs,
        padding: defaultStyles.spacing.xl,
    },
    bar: {
        transformOrigin: "center",
        scaleY: 1, 
        width: 5,
        height: 50,
        borderRadius: 2,
        backgroundColor: defaultStyles.colors.primary,
    }
})
