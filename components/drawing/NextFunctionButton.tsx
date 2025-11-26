import { Alert, Pressable, Text } from "react-native";
import React from "react";
import { styles } from "./styles";
import { NextFunctionButtonPropsType } from "@/app/types/NextFunctionButtonPropsType";

/**
 * Button that go to the next function and reset the drawing and timer.
 * @returns 
 */
export default function NextFunctionButton(props: Readonly<NextFunctionButtonPropsType>) {

    return (
        <Pressable
            onPress={() => {
                Alert.alert('Round terminé', `Votre score : ${Math.round(props.score)}`);
                props.setPoints([]);
                props.setCurrentFunction((prev) => (prev + 1) % props.shuffledFunctions.length);
                props.setResetTimer(true); // Réinitialise le timer
                props.setDrawing(true)
            }}
            style={styles.header_button}
        >
            <Text
                style={styles.header_button_text}>{'Fonction suivante'}
            </Text>
        </Pressable>
    )
}
