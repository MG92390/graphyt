import { Dispatch, SetStateAction } from "react";

export type ResetModalPropsType = {
    resetModalVisible: boolean,
    score: number,
    setResetModalVisible: Dispatch<SetStateAction<boolean>>,
    setResetTimer: Dispatch<SetStateAction<boolean>>,
}
