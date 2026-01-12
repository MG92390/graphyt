import { Alert, Pressable, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";
import { NextFunctionButtonPropsType } from "@/app/types/NextFunctionButtonPropsType";

/**
 * Button that go to the next function and reset the drawing and timer.
 * @returns 
 */
export default function NextFunctionButton(props: Readonly<NextFunctionButtonPropsType>) {
    if (!props.drawing) {
        return (
            <Pressable
                onPress={() => {
                    props.setResetDrawing(true); // Reset the drawing screen
                    props.setTimerRunning(true)
                }}
                style={styles.header_button}
            >
                <Text
                    style={styles.header_button_text}>{'Fonction suivante'}
                </Text>
            </Pressable>
        )
    }
    return (
        <View style={styles.header_button_placeholder}>

        </View>
    )
}
