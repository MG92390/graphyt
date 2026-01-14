import { PointsType } from "./PointsType";
import { Dispatch, SetStateAction } from "react";
import { FunctionType } from "./FunctionType";

export type NextFunctionButtonPropsType = {
    drawing: boolean,
    score: number,
    shuffledFunctions: Array<FunctionType>,
    currentFunction: number,
    setCurrentFunction: Dispatch<SetStateAction<number>>,
    setPoints: Dispatch<SetStateAction<Array<PointsType>>>,
    setResetDrawing: Dispatch<SetStateAction<boolean>>,
    setDrawing: Dispatch<SetStateAction<boolean>>,
    setTimerRunning: Dispatch<SetStateAction<boolean>>,
}