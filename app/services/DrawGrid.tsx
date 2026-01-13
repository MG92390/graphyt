import { Line } from "react-native-svg";
import { GRID_SIZE_Y, SCALE, SCREEN_WIDTH } from "./DrawingDimensions";
import React from "react";

/**
 * Draw a SVG grid
 */

export function drawGrid(grid_size_x: number): React.JSX.Element[] {
    const lines = [];
    // Vertical lines
    for (let x = 0; x <= grid_size_x; x++) {
        //Set the Y-axis
        if (x == Math.floor(grid_size_x / 2)) {
            lines.push(
                <Line
                    key={`v-${x}`}
                    x1={x * SCALE}
                    y1={0}
                    x2={x * SCALE}
                    y2={grid_size_x * 70}
                    stroke="#a61c1cff"
                    strokeWidth="1"
                />
            );
        }
        else {
            lines.push(
                <Line
                    key={`v-${x}`}
                    x1={x * SCALE}
                    y1={0}
                    x2={x * SCALE}
                    y2={grid_size_x * 70}
                    stroke="#e0e0e0"
                    strokeWidth="1"
                />
            );
        }

    }
    // Horizontal lines
    for (let y = 0; y <= GRID_SIZE_Y; y++) {
        //Set the X-axis
        if (y == Math.floor(GRID_SIZE_Y / 2)) {
            lines.push(
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
            lines.push(
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

    return lines;
}