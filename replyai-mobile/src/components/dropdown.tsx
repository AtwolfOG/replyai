import { Modal, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { useState,createContext, useContext } from "react";
import { ThemedText } from "./themed-text";

type DropdownContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: {x: number, y: number};
  setPosition: (position: {x: number, y: number}) => void;
  size: {width: number, height: number};
  setSize: (size: {width: number, height: number}) => void;
};

const DropdownContext = createContext<DropdownContextValue | null>(null);


export function Dropdown({children}: {children: React.ReactNode}) {
  const [visible, setVisible] = useState(false);
  
    return (
    <DropdownContext.Provider value={{ open: visible, setOpen: setVisible }}>
      {children}
    </DropdownContext.Provider>
  );

}

export function DropdownTrigger({children, style}: {children: React.ReactNode, style?: StyleProp<ViewStyle>}) {
  const { setOpen } = useDropdown();
  return (
    <TouchableOpacity onLayout={(e) => {}} style={[styles.trigger, style]} onPress={() => setOpen(true)}>
      {children}
    </TouchableOpacity>
  );
}

export function DropdownContent({children}: {children: React.ReactNode}) {
  const { open, setOpen } = useDropdown();
  return (
    <Modal transparent statusBarTranslucent visible={open} animationType="fade">
      <View style={styles.fullScreenOverlay}>
        <ThemedText>I am full screen!</ThemedText>
        <TouchableOpacity onPress={() => setOpen(false)}>
          <ThemedText>Close</ThemedText>
        </TouchableOpacity>
        {children}
      </View>
    </Modal>
  );
}

function useDropdown() {
  const context = useContext(DropdownContext);

  if (!context) {
    throw new Error("useDropdown must be used within <Dropdown>");
  }

  return context;
}
const styles = StyleSheet.create({
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Dimmed overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
});
