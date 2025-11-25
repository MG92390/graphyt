import { View } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import NavigationButton from "./NavigationButton";
import { style } from "./styles";

/**
 * Button that push the home screen. Reset every provider to null.
 * @returns 
 */
export default function GoHomeButton() {
    const router = useRouter();

    const handleDismissAll = () => {
        router.dismissAll()
    };

    return (
        <View style={style.goHomeButton}>
            <NavigationButton
                href={"/screen/DrawingScreen"}
                message={"Go to home"}
                onPress={() => {
                    //Clear stack history
                    handleDismissAll();
                }}
            />
        </View>
    );
};
