import React, { useRef } from "react";
import {SafeAreaView, TouchableOpacity, Text, StyleSheet, View} from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";


export default function commentModal() {
    // Needed in order to use .show()
    const bottomSheet = useRef();
    alert("clicked");

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => bottomSheet.current.show()}
                //<Text style={styles.text}>Open Comment Modal</Text>
            >

            </TouchableOpacity>
            <BottomSheet
                draggable={false}
                hasDraggableIcon
                ref={bottomSheet}
                height={350}>
                <View>
                    <Text>Test</Text>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    button: {
        height: 50,
        width: 150,
        backgroundColor: "#140078",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        shadowColor: "#8559da",
        shadowOpacity: 0.7,
        shadowOffset: {
            height: 4,
            width: 4,
        },
        shadowRadius: 5,
        elevation: 6,
    },
    text: {
        color: "white",
        fontWeight: "600",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});