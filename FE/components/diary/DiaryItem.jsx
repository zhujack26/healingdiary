import { View, StyleSheet, Text, Image } from "react-native";
import { GlobalColors } from "./../../constants/color";

const DiaryItem = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/SAMPLE1.png")}
                style={styles.image}
            />
            <View style={styles.diaryInfo}>
                <Text style={styles.hashtag}>
                    #해시태그 #해시태그 #해시태그
                </Text>
                <Text style={styles.date}>2023년 3월 4일</Text>
            </View>
        </View>
    );
};

export default DiaryItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: 325,
        height: 90,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        backgroundColor: GlobalColors.colors.white500,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 8,
    },
    diaryInfo: {
        justifyContent: "center",
        marginLeft: 19,
    },
    hashtag: {
        fontFamily: "KoddiUDOnGothic-ExtraBold",
        fontSize: 14,
        color: GlobalColors.colors.black500,
        marginBottom: 8,
    },
    date: {
        fontFamily: "KoddiUDOnGothic-Regular",
        fontSize: 12,
        color: GlobalColors.colors.gray500,
        marginBottom: 8,
    },
});
