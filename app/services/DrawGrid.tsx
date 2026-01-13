import { Line } from "react-native-svg";
import { SCALE, SCREEN_WIDTH } from "./DrawingDimensions";
import React, { useEffect, useState } from "react";
import { DrawGridPropsType } from "../types/DrawGridProps";

/**
 * Draw a SVG grid
 */

export function DrawGrid(props: Readonly<DrawGridPropsType>): React.JSX.Element[] {
    const [lines, setLines] = useState(Array<React.JSX.Element>)

    useEffect(() => {
        const linesTemp = []
        // Vertical lines
        for (let x = 0; x <= props.gridSizeX; x++) {
            //Set the Y-axis
            if (x == Math.floor(props.gridSizeX / 2)) {
                linesTemp.push(
                    <Line
                        key={`v-${x}`}
                        x1={x * SCALE}
                        y1={0}
                        x2={x * SCALE}
                        y2={props.gridSizeX * SCALE * 2}
                        stroke="#a61c1cff"
                        strokeWidth="1"
                    />
                );
            }
            else {
                linesTemp.push(
                    <Line
                        key={`v-${x}`}
                        x1={x * SCALE}
                        y1={0}
                        x2={x * SCALE}
                        y2={props.gridSizeX * SCALE * 2}
                        stroke="#e0e0e0"
                        strokeWidth="1"
                    />
                );
            }

        }
        // Horizontal lines
        for (let y = 0; y <= props.gridSizeY; y++) {
            //Set the X-axis
            if (y == Math.floor(props.gridSizeY / 2)) {
                linesTemp.push(
                    <Line
                        key={`h-${y}`}
                        x1={0}
                        y1={y * SCALE}
                        x2={SCREEN_WIDTH}
                        y2={y * SCALE}
                        stroke="#a61c1cff"
                        strokeWidth="1"
                    />
                );
            }
            else {
                linesTemp.push(
                    <Line
                        key={`h-${y}`}
                        x1={0}
                        y1={y * SCALE}
                        x2={SCREEN_WIDTH}
                        y2={y * SCALE}
                        stroke="#e0e0e0"
                        strokeWidth="1"
                    />
                );
            }
        }
        setLines(linesTemp)
    }, [props.gridSizeX, props.gridSizeY])

    return lines;
}