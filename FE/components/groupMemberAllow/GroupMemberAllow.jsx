import { View, StyleSheet, Text, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import {
  groupApplyList,
  approvalMember,
  rejectAndExitMember,
} from "../../api/group";
import { GlobalColors } from "./../../constants/color";
import GroupMemberAllowList from "./GroupMemberAllowList";

const { width, height } = Dimensions.get("window");

const NotMemeber = () => {
  return (
    <View style={styles.notContainer}>
      <Text style={styles.notText}>가입요청한 멤버가 없어요!</Text>
    </View>
  );
};

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

  if (users?.length === 0) return <NotMemeber />;

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

  notContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    color: GlobalColors.colors.black500,
    fontSize: 18,
  },
});
