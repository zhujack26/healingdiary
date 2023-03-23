import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalColors } from "./../constants/color";
import { Entypo } from '@expo/vector-icons'; 


const PlusButton = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('Making')}
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.pressedButton,
                ]}
            >
                <Entypo name="plus" size={24} color={GlobalColors.colors.white500}/>
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
        alignItems: "center",
        justifyContent: "center"
    },

});

export default PlusButton;