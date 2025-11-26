import { GestureResponderEvent } from "react-native";
import { PointsType } from "./PointsType";
import { Dispatch, SetStateAction } from "react";
import { FunctionType } from "./FunctionType";

export type ValidationButtonPropsType = {
    points: Array<PointsType>,
    shuffledFunctions: Array<FunctionType>,
    currentFunction: number,
    setScore: Dispatch<SetStateAction<number>>,
    setTimeLeft: Dispatch<SetStateAction<number>>,
    setDrawing: Dispatch<SetStateAction<boolean>>,
}