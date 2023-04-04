import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {
  groupApplyList,
  approvalMember,
  rejectAndExitMember,
} from "../../api/group";
import GroupMemberAllowList from "./GroupMemberAllowList";

const GroupMemberAllow = ({ groupId }) => {
  const [users, setUsers] = useState([]);
  const refreshUser = (memberId) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.memberId !== memberId)
    );
  };

  const callGetGroupApplyLists = async () => {
    const res = await groupApplyList(groupId);
    setUsers(res.data.content);
  };

  const callApprovalMember = async (clubMemberId) => {
    const res = await approvalMember(clubMemberId);
    if (res.status === 200) {
      refreshUser(res.data.memberId);
    }
    return res;
  };

  const callRejectMember = async (clubId, memberId) => {
    const res = await rejectAndExitMember({ clubId, memberId });
    if (res.status === 200) {
      refreshUser(res.data.memberId);
    }
    return res;
  };

  useEffect(() => {
    callGetGroupApplyLists();
  }, []);

  return (
    <View style={styles.container}>
      <GroupMemberAllowList
        users={users}
        groupId={groupId}
        callApprovalMember={callApprovalMember}
        callRejectMember={callRejectMember}
      />
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
