import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native"
import Svg from "react-native-svg";
import { DrawGrid } from "@/app/services/DrawGrid";
import { renderCorrectionPoints, renderPoints } from "@/app/services/DrawPoints";
import { CanvaPropsType } from "@/app/types/CanvaPropsType";
import { SCALE } from "@/app/services/DrawingDimensions";
import { useDrawing } from "@/app/context/DrawingContext";

/**
 * The SVG component on which the user draw functions.
 */

export default function Canva(props: Readonly<CanvaPropsType>) {
    const [styles, setStyles] = useState(StyleSheet.create({ canvas: {} }))

    const gridDim = useDrawing()
    useEffect(() => {
        setStyles(StyleSheet.create({
            canvas: {
                backgroundColor: '#2b8ebbff',
                height: gridDim.gridSizeY * SCALE,
                justifyContent: "space-evenly",
                width: gridDim.gridSizeX * SCALE,
            },
        }))
    }, [])

    return <Svg style={styles.canvas}>
        <DrawGrid
            gridSizeX={gridDim.gridSizeX}
            gridSizeY={gridDim.gridSizeY}>
        </DrawGrid>
        {renderPoints(props.points)}
        {props.isCorrection ? renderCorrectionPoints(props.correctPoints) : null}
    </Svg>

}

