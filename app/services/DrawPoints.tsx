import { Circle } from "react-native-svg";
import { PointsType } from "../types/PointsType";
import React from "react";

/**
 * Draw Circle SVG points with given color
 */

export function drawPoints(points: Array<PointsType>, offsetX: number, offsetY: number, color: string): React.JSX.Element[] {

    return points.map((point, index) => (
        <Circle
            key={index}
            cx={point.x - offsetX}
            cy={point.y - offsetY}
            r="4"
            fill={color}
        />
    ));
}

//Render the points on the grid
export function renderPoints(points: Array<PointsType>, offsetX: number, offsetY: number): React.JSX.Element[] {
    return drawPoints(points, offsetX, offsetY, "#6366f1");
};

//Render the correct points
export function renderCorrectionPoints(correctPoints: Array<PointsType>, offsetX: number, offsetY: number): React.JSX.Element[] {
    return drawPoints(correctPoints, offsetX, offsetY, "#b71e13ff");
};