import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "./../constants/color";

const PlusButton = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('Write')}
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.pressedButton,
                ]}
            >
                <Text style={styles.buttonText}> + </Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 20,
        bottom: 100,
    },
    pressedButton: {
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
});

export default PlusButton;