import { PointsType } from "./PointsType";
import { Dispatch, SetStateAction } from "react";

export type ValidationButtonPropsType = {
    drawing: boolean,
    points: Array<PointsType>,
    score: number,
    currentFunction: number,
    setScore: Dispatch<SetStateAction<number>>,
    setTimeLeft: Dispatch<SetStateAction<number>>,
    setDrawing: Dispatch<SetStateAction<boolean>>,
    setIsCorrection: Dispatch<SetStateAction<boolean>>,
    setTimerRunning: Dispatch<SetStateAction<boolean>>,
}