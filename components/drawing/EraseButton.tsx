import { Pressable, Text } from "react-native";
import React from "react";
import { styles } from "./styles";
import { EraseButtonPropsType } from "@/app/types/EraseButtonPropsType";

/**
 * Button that erase the current drawing.
 * @returns 
 */
export default function EraseButton(props: Readonly<EraseButtonPropsType>) {

    return (
        <Pressable
            onPress={() => props.setPoints([])}
            style={props.drawing ? styles.header_button : styles.header_button_disabled}
            disabled={!props.drawing}
        >
            <Text
                style={styles.header_button_text}>{'Effacer'}
            </Text>
        </Pressable>
    )
}
