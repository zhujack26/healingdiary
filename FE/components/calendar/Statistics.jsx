import { View, StyleSheet } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { GlobalColors } from "../../constants/color";

const data = [
  { emotion: "감동", value: 5 },
  { emotion: "우울", value: 1 },
  { emotion: "행복", value: 4 },
  { emotion: "즐거움", value: 9 },
  { emotion: "당황", value: 5 },
];
const getImageUriFromEmotion = (emotion) => {
  switch (emotion) {
    case "기쁨":
      return "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/%EA%B8%B0%EC%81%A8.png";
    case "나쁨":
      return "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/%EB%82%98%EC%81%A8.png";
    case "불행":
      return "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/%EB%B6%88%ED%96%89.png";
    case "평온":
      return "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/%ED%8F%89%EC%98%A8.png";
    case "행복":
      return "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/%ED%96%89%EB%B3%B5.png";
    default:
      return null;
  }
};

const Statistics2 = () => {
  return (
    <View style={styles.container}>
      <VictoryChart
        domainPadding={{ x: 20 }}
        height={200}
        width={330}
        padding={{ top: 10, bottom: 30, left: 50, right: 30 }}
      >
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 12, padding: 15 },
          }}
          tickValues={data.map((d) => d.emotion)}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={data}
          x="emotion"
          y="value"
          barWidth={30}
          alignment="start"
          style={{
            data: {
              fill: GlobalColors.colors.primary500,
            },
          }}
          labels={({ datum }) => ""}
          labelComponent={
            <VictoryLabel
              dy={-20}
              dx={-15}
              renderInPortal={false}
              style={{ height: 30, width: 30 }}
              children={({ x, y, datum }) => {
                const imageUri = getImageUriFromEmotion(datum.emotion);
                return (
                  <Image
                    source={{ uri: imageUri }}
                    style={{
                      position: "absolute",
                      left: x,
                      top: y,
                      width: 30,
                      height: 30,
                    }}
                    resizeMode="contain"
                  />
                );
              }}
            />
          }
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    shadowOpacity: 0.1,
    elevation: 4,
    marginTop: 20,
    padding: 10,
    backgroundColor: GlobalColors.colors.white500,
  },
});

export default Statistics2;
