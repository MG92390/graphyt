import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    goHomeButton: {
        flex: 0.1,
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    navigationButtonContainer: {
        flex: 1,
        margin: "1%",
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    navigationButtonText: {
        alignContent: "center",
        alignItems: "center",
        flex: 1,
        fontWeight: "normal",
        fontSize: 20,
    },
    navigationButtonTextShadow: {
        fontWeight: "bold",
    },
    navigationPressable: {
        alignItems: "center",
        alignContent: "center",
        aspectRatio: 2,
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 2,
        flex: 0.1,
        justifyContent: "center",
        margin: "2%",
        minHeight: 50,
        minWidth: 200,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingStart: "5%",
        paddingEnd: "5%",
        width: "20%"
    }
});