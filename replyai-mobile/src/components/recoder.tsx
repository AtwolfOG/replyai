import { View } from "react-native";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";

export default function Recoder() {
    return (
        <View className="flex-row gap-xs p-xl">
          {Array.from({ length: 10 }).map((_, index) => (
            <Bar key={index} isRecording={true} strokeIndex={index} />
          ))}
        </View>
    )
}

function Bar({isRecording, strokeIndex}: {isRecording: boolean, strokeIndex: number}) {
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
        <Animated.View 
            className="w-[5px] h-[50px] rounded-[2px] bg-primary"
            style={{ transformOrigin: "center", transform: [{ scaleY }] }}
        />
    )
}

function getRandomScale() {
  let scale = Math.random();
  if (scale < 0.3) {
    scale = 0.3;
  }
  return scale;
}

