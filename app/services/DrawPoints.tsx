import { Circle } from "react-native-svg";
import { PointsType } from "../types/PointsType";
import React from "react";
import { OFFSET_X, OFFSET_Y } from "./DrawingDimensions";

/**
 * Draw Circle SVG points with given color
 */

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

//Render the points on the grid
export function renderPoints(points: Array<PointsType>): React.JSX.Element[] {
    return drawPoints(points, "#6366f1");
};

//Render the correct points
export function renderCorrectionPoints(correctPoints: Array<PointsType>): React.JSX.Element[] {
    return drawPoints(correctPoints, "#b71e13ff");
};