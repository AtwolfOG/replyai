import * as Clipboard from "expo-clipboard";
import { Button } from "./button";
import Lucide from "@react-native-vector-icons/lucide";
import { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";

export function Copy({text, icon}: {text: string, icon?: boolean}) {
  const [copied, setCopied] = useState(false);
  const copyToClipboard = useCallback(async (text: string) => {
    await Clipboard.setStringAsync(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text])
  if (copied) {
    return (
        <View className="p-3">
          <Lucide name="check" size={24} className="text-primary" />
        </View>
    )
  }
    return (
         icon ? 
         <TouchableOpacity className="p-3" onPress={() => copyToClipboard(text)}>
           <Lucide name="copy" size={24} className="text-primary" /> 
         </TouchableOpacity>
         :  <Button onPress={() => copyToClipboard(text)}>
          Copy
        </Button>
    )
}
