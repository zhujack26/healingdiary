import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "./../constants/color";

const PlusButton = ({ children, onPress }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{children}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default PlusButton;

const styles = StyleSheet.create({
    container: {
        marginLeft: 4,
    },
    pressed: {
        opacity: 0.75,
    },

    button: {
        width: 85,
        height: 30,
        borderRadius: 16,
        backgroundColor: GlobalColors.colors.white500,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 18,
    },
    selected: {
        backgroundColor: GlobalColors.colors.primary500,
    },
    buttonText: {
        fontFamily: "KoddiUDOnGothic-Regular",
        color: GlobalColors.colors.gray500,
        fontSize: 13,
        textAlign: "center",
    },
    selectedText: {
        color: GlobalColors.colors.white500,
    },
});
