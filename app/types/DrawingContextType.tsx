import { Dispatch, SetStateAction } from "react";
import { FunctionType } from "./FunctionType";
import { PointsType } from "./PointsType";

export type DrawingContextType = {
    shuffledFunctions: Array<FunctionType>,
    currentFunction: number,
    score: number,
    timeLeft: number,
    drawing: boolean,
    points: Array<PointsType>,
    gridSizeX: number,
    gridSizeY: number,
    offsetX: number,
    offsetY: number,
    setScore: Dispatch<SetStateAction<number>>,
    setTimeLeft: Dispatch<SetStateAction<number>>,
    setDrawing: Dispatch<SetStateAction<boolean>>,
    setPoints: Dispatch<SetStateAction<Array<PointsType>>>,
};