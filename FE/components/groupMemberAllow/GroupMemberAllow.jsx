import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { callGroupApplyList } from "../../api/group";
import GroupMemberAllowList from "./GroupMemberAllowList";

const GroupMemberAllow = ({ groupId }) => {
  const [users, setUsers] = useState([]);

  const getGroupApplyLists = async () => {
    const res = await callGroupApplyList(groupId);
    setUsers(res.data);
  };

  useEffect(() => {
    getGroupApplyLists();
  }, []);
  return (
    <View style={styles.container}>
      <GroupMemberAllowList users={users} />
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
