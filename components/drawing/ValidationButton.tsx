import { Pressable, Text } from "react-native";
import React, { Dispatch, SetStateAction, useCallback } from "react";
import { styles } from "./styles";
import { ValidationButtonPropsType } from "@/app/types/ValidationButtonPropsType";
import { PointsType } from "@/app/types/PointsType";
import { computePointsY } from "@/app/services/ComputePoints";
import { MATH_FUNCTIONS } from "@/app/services/MathFunctions";

/**
 * Button that stop the timer and calculate the score.
 * @returns 
 */
export default function ValidationButton(props: Readonly<ValidationButtonPropsType>) {

    const calculateScore = useCallback(
        (points: Array<PointsType>,
            currentFunction: number,
            score: number,
            setScore: Dispatch<SetStateAction<number>>): void => {
            const actualPoints = points.map((p) => ({
                x: p.x,
                y: computePointsY(MATH_FUNCTIONS[currentFunction], p.x),
            }));

            //Compute the distance between the corrected point and the point drawn
            const distances = points.map((p, i) =>
                Math.abs(p.y - actualPoints[i]?.y || 0)
            );

            const avgDistance = distances.reduce((a, b) => a + b, 0) / distances.length;
            const isCorrect = Math.max(0, 100 - avgDistance * 20);
            //If the points are closed enough to the correction, add 1 point to score
            if (isCorrect != 0) {
                setScore(score + 1);
            }
        }, []);

    return (
        <Pressable
            onPress={() => {
                props.setTimeLeft(0);
                props.setDrawing(false);
                props.setIsCorrection(true);
                calculateScore(props.points, props.currentFunction, props.score, props.setScore);
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
