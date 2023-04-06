import { View, StyleSheet, Button, Text, Pressable } from "react-native";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory-native";
import { GlobalColors } from "../../constants/color";
import { useEffect, useState } from "react";
import { getStatisticsDiary } from "../../api/diary";
import { AntDesign } from "@expo/vector-icons";

const Statistics = () => {
  const [StatisticsData, setStatisticsData] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  useEffect(() => {
    const getStatisticsDiaries = async () => {
      const processData = (data) => {
        const defaultData = defaultEmotions.map((emotion) => ({
          value: emotion,
          count: 0,
        }));
        const updatedData = [...defaultData];

        data.forEach((item) => {
          const index = defaultData.findIndex((d) => d.value === item.value);
          if (index >= 0) {
            updatedData[index].count = item.count;
          }
        });

        return updatedData;
      };
      const today = new Date();
      const year = today.getFullYear();
      const month = currentMonth;
      const res = await getStatisticsDiary(year, month);
      console.log(res);
      setStatisticsData(processData(res));
    };
    getStatisticsDiaries();
  }, [currentMonth]);

  // 월 변경 함수
  const changeMonth = (offset) => {
    setCurrentMonth((prevMonth) => {
      let newMonth = prevMonth + offset;
      if (newMonth < 1) {
        newMonth = 12;
        setCurrentYear((prevYear) => prevYear - 1); // 년도 감소
      } else if (newMonth > 12) {
        newMonth = 1;
        setCurrentYear((prevYear) => prevYear + 1); // 년도 증가
      }
      return newMonth;
    });
  };
  const defaultEmotions = ["불행", "나쁨", "평온", "기쁨", "행복"];
  const maxCount = Math.max(...StatisticsData.map((d) => d.count));
  const minCount = Math.min(...StatisticsData.map((d) => d.count));
  return (
    <View style={styles.container}>
      <View style={styles.monthSelector}>
        <Pressable onPress={() => changeMonth(-1)} style={{ right: 100 }}>
          <AntDesign name="left" size={15} color="gray" />
        </Pressable>
        <Text style={{ marginHorizontal: 10 }}>
          {currentYear}년 {currentMonth}월
        </Text>
        <Pressable onPress={() => changeMonth(1)} style={{ left: 100 }}>
          <AntDesign name="right" size={15} color="gray" />
        </Pressable>
      </View>
      <VictoryChart
        domainPadding={{ x: 30 }}
        height={200}
        width={370}
        padding={{ top: 20, bottom: 30, left: 40, right: 40 }}
      >
        <VictoryAxis
          style={{
            tickLabels: { fontSize: 12, padding: 15 },
          }}
          tickValues={defaultEmotions}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[minCount, maxCount]} // 최소 값과 최대 값만 표시
          tickFormat={(t) => (t > 0 ? Math.round(t) : "")}
        />
        <VictoryBar
          data={StatisticsData}
          x="value"
          y="count"
          barWidth={30}
          style={{
            data: {
              fill: ({ datum }) => {
                switch (datum.value) {
                  case "불행":
                    return GlobalColors.colors.emotionCode1;
                  case "나쁨":
                    return GlobalColors.colors.emotionCode2;
                  case "평온":
                    return GlobalColors.colors.emotionCode3;
                  case "기쁨":
                    return GlobalColors.colors.emotionCode4;
                  case "행복":
                    return GlobalColors.colors.emotionCode5;
                  default:
                    return GlobalColors.colors.primary500;
                }
              },
            },
          }}
          labelComponent={
            <VictoryLabel
              dy={-20}
              dx={-15}
              renderInPortal={false}
              style={{ height: 30, width: 30 }}
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
    padding: 30,
    backgroundColor: GlobalColors.colors.white500,
  },
  monthSelector: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});

export default Statistics;
