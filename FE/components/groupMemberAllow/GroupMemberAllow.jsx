import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { callGroupApplyList, callMemberApproval } from "../../api/group";
import GroupMemberAllowList from "./GroupMemberAllowList";

const GroupMemberAllow = ({ groupId }) => {
  const [users, setUsers] = useState([]);

  const getGroupApplyLists = async () => {
    const res = await callGroupApplyList(groupId);
    setUsers(res.data);
  };

  const memberApproval = async (clubMemberId) => {
    const res = await callMemberApproval(clubMemberId);
    if (res.status === 200) {
      getGroupApplyLists();
    }
  };
  useEffect(() => {
    getGroupApplyLists();
  }, []);
  return (
    <View style={styles.container}>
      <GroupMemberAllowList users={users} memberApproval={memberApproval} />
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
