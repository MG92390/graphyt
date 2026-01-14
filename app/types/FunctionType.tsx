import { GestureResponderEvent } from "react-native";
import { PointsType } from "./PointsType";
import { Dispatch, SetStateAction } from "react";

export type FunctionType = {
    name: string,
    formula: ((x: number) => number),
}