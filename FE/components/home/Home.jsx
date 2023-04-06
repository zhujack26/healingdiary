import { ScrollView, StyleSheet, Dimensions } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useEffect, useRef, useCallback } from "react";
import { getRecommendDiary } from "../../api/diary";

import RecommendDiary from "./RecommendDiary";
import RecommendGroup from "./RecommendGroup";
import RecentDiary from "./RecentDiary";
import BottomTabContainer from "../BottomTabContainer/BottomTabContainer";
import { getRecommendGroup } from "../../api/group";
import { getRecentDiary } from "./../../api/diary";

const { width, height } = Dimensions.get("window");

const Home = ({ refreshKey }) => {
  const initialDiaries = useRef([]);
  const initialGroups = useRef([]);
  const initialRecentDiaries = useRef([]);

  const [diaries, setDiaries] = useState([]);
  const [groups, setGroups] = useState([]);
  const [recentDiaries, setRecentDiaries] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const getRecoDiary = async () => {
        const res = await getRecommendDiary();
        if (JSON.stringify(res) !== JSON.stringify(initialDiaries.current)) {
          setDiaries(res);
        }
      };

      const getRecoGroup = async () => {
        const res = await getRecommendGroup();
        if (JSON.stringify(res) !== JSON.stringify(initialGroups.current)) {
          setGroups(res);
        }
      };

      const callGetRecentDiary = async () => {
        const res = await getRecentDiary();
        if (JSON.stringify(res) !== JSON.stringify(initialGroups.current)) {
          setRecentDiaries(res);
        }
      };

      getRecoDiary();
      getRecoGroup();
      callGetRecentDiary();

      return () => {};
    }, [])
  );

  useEffect(() => {
    initialDiaries.current = diaries;
    initialGroups.current = groups;
    initialRecentDiaries.current = recentDiaries;
  }, [diaries, groups, recentDiaries]);

  return (
    <BottomTabContainer key={refreshKey}>
      <ScrollView style={styles.container}>
        <RecommendGroup groups={groups} />
        <RecommendDiary diaries={diaries} />
        <RecentDiary diaries={recentDiaries} />
      </ScrollView>
    </BottomTabContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    paddingHorizontal: 16,
    margintTop: 8,
  },
});
