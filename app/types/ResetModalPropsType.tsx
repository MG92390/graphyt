import { Dispatch, SetStateAction } from "react";

export type ResetModalPropsType = {
    resetModalVisible: boolean,
    setResetModalVisible: Dispatch<SetStateAction<boolean>>,
    setResetTimer: Dispatch<SetStateAction<boolean>>,
}
