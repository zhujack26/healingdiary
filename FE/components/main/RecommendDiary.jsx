import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import Title from "../../ui/Title";
import { GlobalColors } from "./../../constants/color";

const deviceWidth = Dimensions.get("window").width - 50;

const RecommendDiary = () => {
    return (
        <View style={styles.container}>
            <Title>요즘 뜨는 일기</Title>
            <View style={styles.wrapper}>
                <View style={styles.diaries}>
                    <View style={styles.diary}>
                        <Image
                            source={require("../../assets/images/SAMPLE1.png")}
                            style={styles.image}
                        />
                        <Text style={styles.name}>소모임 이름</Text>
                        <Text style={styles.hashtag}>#해시태그</Text>
                    </View>
                    <View style={styles.diary}>
                        <Image
                            source={require("../../assets/images/SAMPLE2.png")}
                            style={styles.image}
                        />
                        <Text style={styles.name}>소모임 이름</Text>
                        <Text style={styles.hashtag}>#해시태그</Text>
                    </View>
                    <View style={styles.diary}>
                        <Image
                            source={require("../../assets/images/SAMPLE3.png")}
                            style={styles.image}
                        />
                        <Text style={styles.name}>소모임 이름</Text>
                        <Text style={styles.hashtag}>#해시태그</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default RecommendDiary;

const styles = StyleSheet.create({
    container: {
        width: deviceWidth,
        marginBottom: 26,
    },
    wrapper: {},
    diaries: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    image: {
        width: 105,
        height: 105,
        borderRadius: 12,
    },
    name: {
        fontFamily: "KoddiUDOnGothic-Regular",
        marginBottom: 3,
    },
    hashtag: {
        fontFamily: "KoddiUDOnGothic-Regular",
        fontSize: 12,
        color: GlobalColors.colors.gray600,
    },
});
