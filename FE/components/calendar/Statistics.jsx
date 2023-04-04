import { View, Dimensions, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { BarChart } from "react-native-chart-kit";

const chartConfig = {
  backgroundGradientFrom: GlobalColors.colors.white500,
  backgroundGradientTo: GlobalColors.colors.white500,
  decimalPlaces: 0, //소수점 자릿수
  color: (opacity = 1) =>
    GlobalColors.colors.primary500.replace("1)", `${opacity})`),
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  barPercentage: 0.5, //막대 차트의 각 막대 너비에 대한 비율 0에서 1 사이의 값을 사용
};

const data = {
  labels: ["감동", "우울", "행복", "즐거움", "당황"], //이모티콘을 못바꿈..
  datasets: [
    {
      data: [5, 1, 4, 9, 5],
    },
  ],
};

const Statistics = () => {
  return (
    <View style={styles.container}>
      <BarChart
        data={data}
        width={330}
        height={250}
        withInnerLines={false}
        segments={2}
        withHorizontalLabels={false}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        showValuesOnTopOfBars
        showBarTops={false}
      />
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
    //BarChart 컴포넌트는 기본적으로 왼쪽 패딩을 가지고 있음
  },
});

export default Statistics;
