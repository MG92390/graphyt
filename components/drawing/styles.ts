import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header_buttons: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#4c38afff',
    },
    header_button: {
        alignItems: 'center',
        backgroundColor: '#b1b9dcff',
        borderWidth: 3,
        borderRadius: 45,
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: "center",
        padding: 10
    },
    header_button_disabled: {
        alignItems: 'center',
        backgroundColor: '#c7cce0ff',
        borderWidth: 2,
        borderRadius: 45,
        borderColor: '#393b45ff',
        flex: 0.2,
        flexDirection: 'column',
        justifyContent: "center",
        padding: 10
    },
    header_button_text: {
        fontSize: 14,
    }
});