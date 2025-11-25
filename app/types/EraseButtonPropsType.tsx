import { GestureResponderEvent } from "react-native";
import { PointsType } from "./PointsType";

export type EraseButtonPropsType = {
    points: Array<PointsType>
    onPress?: ((event: GestureResponderEvent) => void),
}