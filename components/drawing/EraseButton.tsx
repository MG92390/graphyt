import { Alert, Pressable, Text, View } from "react-native";
import React from "react";
import { styles } from "./styles";
import { EraseButtonPropsType } from "@/app/types/EraseButtonPropsType";

/**
 * Button that push the home screen. Reset every provider to null.
 * @returns 
 */
export default function EraseButton(props: Readonly<EraseButtonPropsType>) {

    return (
        <Pressable
            onPress={() => props.setPoints([])}
            style={styles.header_button}
        >
            <Text
                style={styles.header_button_text}>{'Effacer'}
            </Text>
        </Pressable>
    )
}
