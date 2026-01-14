import { Pressable, StyleProp, Text, TextStyle, View } from "react-native";
import { Link } from "expo-router";
import React, { useState } from "react";
import { NavigationButtonPropsType } from "@/app/types/NavigationButtonPropsType";
import { style } from "./styles";

/**
 * Button that allow navigation between screens.
 * @returns 
 */
export default function NavigationButton(props: Readonly<NavigationButtonPropsType>) {

    const [styleText, setStyleText] = useState<StyleProp<TextStyle>>(style.navigationButtonText);
    return (
        <View style={style.navigationButtonContainer}>
            <Link
                href={props.href}
                asChild
            >
                <Pressable
                    style={style.navigationPressable}
                    onHoverIn={() => {
                        setStyleText([style.navigationButtonText, style.navigationButtonTextShadow]);
                    }}
                    onHoverOut={() => {
                        setStyleText(style.navigationButtonText);
                    }}
                    onPress={props?.onPress ? props?.onPress : () => { }}
                >
                    <Text
                        style={styleText}
                    >{props.message}</Text>
                </Pressable>
            </Link>
        </View >
    );
};
