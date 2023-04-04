import React from "react";
import { View, StyleSheet } from "react-native";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory-native";
import { GlobalColors } from "../../constants/color";

const data = [
  { emotion: "감동", value: 5 },
  { emotion: "우울", value: 1 },
  { emotion: "행복", value: 4 },
  { emotion: "즐거움", value: 9 },
  { emotion: "당황", value: 5 },
];

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
            ticks: { stroke: "black", size: 5 },
            tickLabels: { fontSize: 12, padding: 5 },
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
