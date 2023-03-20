import { View, ScrollView, StyleSheet } from "react-native";

import GroupDiaryList from "./GroupDiaryList";
import GroupIntroduction from "./GroupIntroduction";

const GroupDetail = () => {
  return (
    <ScrollView style={styles.container}>
      <GroupIntroduction />
      <View style={styles.groupDiaryListContanier}>
        <GroupDiaryList />
      </View>
    </ScrollView>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },

  groupDiaryListContanier: {
    alignItems: "center",
  },
});
