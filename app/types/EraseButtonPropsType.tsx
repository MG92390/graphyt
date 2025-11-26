import { GestureResponderEvent } from "react-native";
import { PointsType } from "./PointsType";
import { Dispatch, SetStateAction } from "react";

export type EraseButtonPropsType = {
    drawing: boolean,
    setPoints: Dispatch<SetStateAction<Array<PointsType>>>,
    onPress?: ((event: GestureResponderEvent) => void),
}