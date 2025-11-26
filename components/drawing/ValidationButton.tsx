import { Pressable, Text } from "react-native";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { styles } from "./styles";
import { ValidationButtonPropsType } from "@/app/types/ValidationButtonPropsType";
import { FunctionType } from "@/app/types/FunctionType";
import { PointsType } from "@/app/types/PointsType";

/**
 * Button that stop the timer and calculate the score.
 * @returns 
 */
export default function ValidationButton(props: Readonly<ValidationButtonPropsType>) {

    const calculateScore = useCallback(
        (points: Array<PointsType>,
            shuffledFunctions: Array<FunctionType>,
            currentFunction: number,
            setScore: Dispatch<SetStateAction<number>>): void => {
            const actualPoints = points.map((p) => ({
                x: p.x,
                y: shuffledFunctions[currentFunction].formula(p.x),
            }));

            const distances = points.map((p, i) =>
                Math.abs(p.y - actualPoints[i]?.y || 0)
            );

            const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
            const newScore = Math.max(0, 100 - avgDistance * 20);
            setScore(newScore);
        }, []);

    return (
        <Pressable
            onPress={() => {
                props.setTimeLeft(0);
                props.setDrawing(false);
                calculateScore(props.points, props.shuffledFunctions, props.currentFunction, props.setScore);
            }
            }
            style={props.drawing ? styles.header_button : styles.header_button_disabled}
        >
            <Text
                style={styles.header_button_text}>{'Valider'}
            </Text>
        </Pressable>
    )
}
