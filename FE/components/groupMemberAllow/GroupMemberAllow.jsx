import { View, StyleSheet } from "react-native";
import GroupMemberAllowList from "./GroupMemberAllowList";

const GroupMemberAllow = () => {
  return (
    <View style={styles.container}>
      <GroupMemberAllowList />
    </View>
  );
};

export default GroupMemberAllow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});
