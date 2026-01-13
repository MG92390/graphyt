import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native"
import Svg from "react-native-svg";
import { drawGrid } from "@/app/services/DrawGrid";
import { renderCorrectionPoints, renderPoints } from "@/app/services/DrawPoints";
import { CanvaPropsType } from "@/app/types/CanvaPropsType";
import { SCALE, SCREEN_WIDTH } from "@/app/services/DrawingDimensions";
import { floorEvenNumber } from "@/app/services/FloorEvenNumber";

/**
 * The SVG component on which the user draw functions.
 */

export default function Canva(props: Readonly<CanvaPropsType>) {
    const [gridSizeX, setGridSizeX] = useState(0);
    const [styles, setStyles] = useState(StyleSheet.create({ canvas: {} }))

    useEffect(() => {
        const maxWidth = SCREEN_WIDTH * 0.9;
        const gridSizeXTemp = floorEvenNumber(maxWidth / SCALE);
        setGridSizeX(gridSizeXTemp)
        setStyles(StyleSheet.create({
            canvas: {
                flex: 0.9,
                backgroundColor: '#2b8ebbff',
                justifyContent: "space-evenly",
                width: gridSizeXTemp * SCALE,
                minHeight: '50%'
            },
        }))
    }, [])

    return <Svg style={styles.canvas} >
        {drawGrid(gridSizeX)}
        {renderPoints(props.points)}
        {props.isCorrection ? renderCorrectionPoints(props.correctPoints) : <Text>Test</Text>}
    </Svg>

}

