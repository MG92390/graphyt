import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";
import { ResetModalPropsType } from "@/app/types/ResetModalPropsType";

export default function ResetModal(props: Readonly<ResetModalPropsType>) {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.resetModalVisible}
            onRequestClose={() => {
                props.setResetModalVisible(false);
            }}>
            <ScrollView contentContainerStyle={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        Ton score : {props.score}
                    </Text>
                    <Pressable
                        style={styles.configButton}
                        onPress={() => {
                            props.setResetTimer(true)
                        }}
                    >
                        <Text>Recommencer</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </Modal>)
}