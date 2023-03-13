import { View, StyleSheet } from "react-native";

import Button from "../../ui/Button";

const Buttons = ({ activeIndex, handleActiveIndex }) => {
    return (
        <View style={styles.buttons}>
            <Button
                activeIndex={activeIndex}
                onPress={() => handleActiveIndex(0)}
            >
                전체
            </Button>
            <Button
                activeIndex={activeIndex}
                onPress={() => handleActiveIndex(1)}
            >
                일기
            </Button>
            <Button
                activeIndex={activeIndex}
                onPress={() => handleActiveIndex(2)}
            >
                소모임 일기
            </Button>
        </View>
    );
};

export default Buttons;

const styles = StyleSheet.create({
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 34,
    },
});
