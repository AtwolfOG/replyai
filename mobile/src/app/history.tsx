import { Text, View } from "react-native";
import Container from "@/components/container";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "@/components/ui/menu";
import { Button } from "@/components/button";
import { useState } from "react";

export default function History() {
    const [open, setOpen] = useState(false);
    return (  
        <Container>
        <View>
            <Text>History</Text>
        </View>
        <Menu 
        isOpen={open}  
        disableKeys={["Spanish"]} 
        placement="top" 
        trigger={(triggerProps, state) => {console.log(triggerProps, state);return<Button {...triggerProps}>Select Language</Button>}}>
            <MenuItem key="English"  textValue="English">
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
        </Container>
    );
}
