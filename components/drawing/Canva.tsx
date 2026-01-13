import React from "react";
import { Text } from "react-native"
import Svg from "react-native-svg";
import { styles } from "./styles";
import { drawGrid } from "@/app/services/DrawGrid";
import { renderCorrectionPoints, renderPoints } from "@/app/services/DrawPoints";
import { CanvaPropsType } from "@/app/types/CanvaPropsType";

/**
 * The SVG component on which the user draw functions.
 */

export default function Canva(props: Readonly<CanvaPropsType>) {
    return <Svg style={
        styles.canvas
    } >
        {drawGrid()}
        {renderPoints(props.points)}
        {props.isCorrection ? renderCorrectionPoints(props.correctPoints) : <Text>Test</Text>}
    </Svg>
}

