import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    animated_view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
    },
    container: {
        justifyContent: "space-evenly",
        flex: 1,
        backgroundColor: '#aebbd6ff',
        minHeight: '50%'
    },
    header: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        flex: 0.2,
        flexDirection: 'row',
        minHeight: "20%",
        padding: 10
    },
    header_text: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        flex: 0.33,
    },
    header_buttons: {
        alignItems: 'center',
        justifyContent: "space-evenly",
        flex: 1,
        flexDirection: 'row',
    },
    header_button: {
        alignItems: 'center',
        backgroundColor: '#b1b9dcff',
        borderWidth: 2,
        borderRadius: 45,
        flex: 0.2,
        justifyContent: "space-evenly",
        padding: 10,
        paddingHorizontal: 20
    },
    header_button_text: {
        fontSize: 14
    },
    functionText: {
        alignItems: "center",
        flex: 1,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    score: {
        alignItems: "center",
        fontSize: 20,
        color: '#6366f1',
        fontWeight: 'bold',
        justifyContent: "space-evenly",
    },
    timer: {
        alignItems: "center",
        fontSize: 18,
        color: '#ff0000',
        marginTop: 10,
        justifyContent: "space-evenly",
    },
    canvas: {
        flex: 0.9,
        backgroundColor: '#2b8ebbff',
        justifyContent: "space-evenly",
        width: "90%",
        minHeight: '50%'
    },
});