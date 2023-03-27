import { useRef } from "react";
import {
  Image,
  View,
  StyleSheet,
  Dimensions,
  Text,
  Animated,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import GoogleLogin from "./GoogleLogin";
import KakaoLogin from "./KakaoLogin";

const { width, height } = Dimensions.get("window");
const bgs = [
  GlobalColors.colors.primary400,
  GlobalColors.colors.secondary500,
  GlobalColors.colors.primary500,
];
const DATA = [
  {
    key: "3571572",
    title: "환자를 위한 치료 동반 다이어리",
    description: "지금의 감정을 표시하고 간단히 목소리로 일기를 남기세요!",
    image: require("../../assets/images/icons/good.gif"),
  },
  {
    key: "3571747",
    title: "나누고 싶은 감정은 공유해보세요",
    description: "공감대를 형성하고 함께 이겨낼 수 있어요!",
    image: require("../../assets/images/icons/gloomy.gif"),
  },
  {
    key: "3571680",
    title: "감정 공유의 힘, 함께 이겨낼 수 있어요",
    description:
      "치료를 받는 동안 함께 성장하는 일기를 써보세요. 치료 과정에서 느꼈던 감정과 발전하는 모습을 기록해보세요!",
    image: require("../../assets/images/icons/satisfied.gif"),
  },
];

const Indicator = ({ scrollX }) => {
  return (
    <View style={{ position: "absolute", bottom: 180, flexDirection: "row" }}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange: inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: "#fff",
              opacity: opacity,
              margin: 10,
              transform: [{ scale: scale }],
            }}
            key={`indication-${i}`}
          />
        );
      })}
    </View>
  );
};

const Backdrop = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    />
  );
};

const Square = ({ scrollX }) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1
  );
  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["35deg", "0deg", "35deg"],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });
  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: "#fff",
        borderRadius: 86,
        position: "absolute",
        top: -height * 0.6,
        left: -height * 0.3,
        transform: [
          {
            rotate: rotate,
          },
          {
            translateX: translateX,
          },
        ],
      }}
    />
  );
};
const Logo = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <Backdrop scrollX={scrollX} />
      <Square scrollX={scrollX} />
      <Animated.FlatList
        data={DATA}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View
              style={{
                width: width,
                padding: 20,
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flex: 0.7,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={item.image}
                  style={{
                    width: width / 1.3,
                    height: width / 1.1,
                    resizeMode: "contain",
                  }}
                />
              </View>
              <View style={{ flex: 0.3 }}>
                <Text
                  style={{
                    fontFamily: "KoddiUDOnGothic-ExtraBold",
                    fontSize: 28,
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: "KoddiUDOnGothic-Regular",
                    fontWeight: "400",
                    fontSize: 16,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />
      <Indicator scrollX={scrollX} />
      <GoogleLogin />
      <KakaoLogin />
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
