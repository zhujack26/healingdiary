import { View, StyleSheet } from "react-native";
import GroupMemberList from "./GroupMemberList";

const GroupMember = () => {
  return (
    <View style={styles.container}>
      <GroupMemberList />
    </View>
  );
};

export default GroupMember;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});
