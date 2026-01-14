import { Href } from "expo-router";
import { GestureResponderEvent } from "react-native";

export type NavigationButtonPropsType = {
    href: Href,
    message: string,
    onPress?: ((event: GestureResponderEvent) => void),
}