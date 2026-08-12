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
  const [position, setPosition] = useState({x: 0, y: 0});
  const [size, setSize] = useState({width: 0, height: 0});
  
    return (
    <DropdownContext.Provider value={{ open: visible, setOpen: setVisible, position, setPosition, size, setSize }}>
      {children}
    </DropdownContext.Provider>
  );

}


export function DropdownTrigger({children, className, style}: {children: React.ReactNode, className?: string, style?: StyleProp<ViewStyle>}) {
  const { setOpen } = useDropdown();
  return (
    <TouchableOpacity onLayout={(e) => {}} className={className} style={style} onPress={() => setOpen(true)}>
      {children}
    </TouchableOpacity>
  );
}

export function DropdownContent({children}: {children: React.ReactNode}) {
  const { open, setOpen } = useDropdown();
  return (
    <Modal transparent statusBarTranslucent visible={open} animationType="fade">
      <View className="flex-1 bg-black/10 justify-center items-center">
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

