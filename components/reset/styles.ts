import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    configButton: {
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 2,
        flex: 0.1,
        justifyContent: "center",
        margin: 15,
        paddingTop: "1%",
        paddingBottom: "1%",
        paddingStart: "5%",
        paddingEnd: "5%",
    },
    modalView: {
        alignItems: 'center',
        backgroundColor: "white",
        borderRadius: 20,
        justifyContent: "center",
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        width: '80%',
        flex: 0.5,
    },
})