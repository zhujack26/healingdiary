import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "./../constants/color";

const PlusButton = ({ onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                >
                <View style={styles.button}>
                    <Text style={styles.buttonText}> + </Text>
                </View>
            </Pressable>
        </View>
    );
};

export default PlusButton;

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 20,
        bottom: 100,
    },
    pressed: {
        opacity: 0.75,
    },

    button: {
        width: 30,
        height: 30,
        borderRadius: 30,
        backgroundColor: GlobalColors.colors.primary500,
    },
    buttonText: {
        color: GlobalColors.colors.white500,
        fontSize: 20,
        textAlign: "center",
    },
    selectedText: {
        color: GlobalColors.colors.white500,
    },
});
