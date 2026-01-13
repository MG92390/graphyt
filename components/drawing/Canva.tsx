import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native"
import Svg from "react-native-svg";
import { DrawGrid } from "@/app/services/DrawGrid";
import { renderCorrectionPoints, renderPoints } from "@/app/services/DrawPoints";
import { CanvaPropsType } from "@/app/types/CanvaPropsType";
import { SCALE, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/app/services/DrawingDimensions";
import { floorEvenNumber } from "@/app/services/FloorEvenNumber";

/**
 * The SVG component on which the user draw functions.
 */

export default function Canva(props: Readonly<CanvaPropsType>) {
    const [gridSizeX, setGridSizeX] = useState(0);
    const [gridSizeY, setGridSizeY] = useState(0);
    const [styles, setStyles] = useState(StyleSheet.create({ canvas: {} }))

    useEffect(() => {
        const maxWidth = SCREEN_WIDTH * 0.9;
        const gridSizeXTemp = floorEvenNumber(maxWidth / SCALE);
        setGridSizeX(gridSizeXTemp)
        const maxHeight = SCREEN_HEIGHT * 0.7
        const gridSizeYTemp = floorEvenNumber(maxHeight / SCALE);
        setGridSizeY(gridSizeYTemp)

        setStyles(StyleSheet.create({
            canvas: {
                backgroundColor: '#2b8ebbff',
                height: gridSizeYTemp * SCALE,
                justifyContent: "space-evenly",
                width: gridSizeXTemp * SCALE,
            },
        }))
    }, [])

    return <Svg style={styles.canvas}>
        <DrawGrid
            gridSizeX={gridSizeX}
            gridSizeY={gridSizeY}>
        </DrawGrid>
        {renderPoints(props.points)}
        {props.isCorrection ? renderCorrectionPoints(props.correctPoints) : null}
    </Svg>

}

