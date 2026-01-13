/**
 * Draw Circle SVG points with given color
 */

import { Circle } from "react-native-svg";
import { PointsType } from "../types/PointsType";
import React from "react";
import { OFFSET_X, OFFSET_Y } from "./DrawingDimensions";

export function drawPoints(points: Array<PointsType>, color: string): React.JSX.Element[] {
    return points.map((point, index) => (
        <Circle
            key={index}
            cx={point.x - OFFSET_X}
            cy={point.y - OFFSET_Y}
            r="4"
            fill={color}
        />
    ));
}