import { View, TextInput, Text, StyleSheet } from "react-native";

import GroupInfoUpdateHeader from "./GroupInfoUpdateHeader";
import { GlobalColors } from "./../../constants/color";

const GroupInfoUpdate = () => {
  return (
    <>
      <GroupInfoUpdateHeader />
      <View style={styles.container}>
        <View style={styles.groupNameContainer}>
          <Text style={styles.groupName}>소모임 이름</Text>
          <TextInput style={styles.groupNameInput} />
        </View>
      </View>
    </>
  );
};

export default GroupInfoUpdate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },

  groupNameContainer: {},

  groupName: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 24,
    marginBottom: 16,
  },

  groupNameInput: {
    fontFamily: "KoddiUDOnGothic-Regular",
    borderBottomWidth: 2,
    borderBottomColor: GlobalColors.colors.primary500,
    fontSize: 16,
  },
});
