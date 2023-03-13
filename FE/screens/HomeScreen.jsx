import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useState } from "react";

import RecentDiary from "../components/main/RecentDiary";
import RecommendGroup from "../components/main/RecommendGroup";
import RecommendDiary from "./../components/main/RecommendDiary";
import Buttons from "../components/main/Buttons";
import DiaryItem from "./../components/diary/DiaryItem";

const deviceHeight = Dimensions.get("window").height - 130;
const HomeScreen = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleActiveIndex = (index) => {
        setActiveIndex(index);
    };

    const renderItem = () => {
        if (activeIndex === 0) {
            return (
                <>
                    <RecommendGroup />
                    <RecommendDiary />
                    <RecentDiary />
                </>
            );
        }
        if (activeIndex === 1) {
            return <DiaryItem />;
        }
    };

    return (
        <View style={styles.container}>
            <Buttons
                activeIndex={activeIndex}
                handleActiveIndex={handleActiveIndex}
            />
            <ScrollView>{renderItem()}</ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        height: deviceHeight,
    },
});
