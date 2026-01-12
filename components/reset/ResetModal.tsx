import React from "react";
import { Modal, ScrollView } from "react-native";
import { styles } from "./styles";
import { ResetModalPropsType } from "@/app/types/ResetModalPropsType";

export default function ResetModal(props: Readonly<ResetModalPropsType>) {
    return <Modal
        animationType="slide"
        transparent={true}
        visible={props.resetModalVisible}
        onRequestClose={() => {
            props.setResetModalVisible(!props.resetModalVisible);
        }}>
        <ScrollView contentContainerStyle={styles.centeredView}>
            WIP
        </ScrollView>
    </Modal>
}