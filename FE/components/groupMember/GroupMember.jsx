import { View, StyleSheet } from "react-native";
import { rejectAndExitMember, getGroupMemebrList } from "../../api/group";
import { useEffect, useState } from "react";
import GroupMemberList from "./GroupMemberList";

const GroupMember = ({ groupId }) => {
  const [groupMember, setGroupMember] = useState([]);

  const refreshUser = (memberId) => {
    setGroupMember((groupMembers) =>
      groupMembers.filter((groupMember) => groupMember.memberId !== memberId)
    );
  };

  const callGroupMemberList = async () => {
    const res = await getGroupMemebrList(groupId);
    setGroupMember(res.content);
  };

  const callRejectMember = async (clubId, memberId) => {
    const res = await rejectAndExitMember({ clubId, memberId });
    if (res.status === 200) {
      refreshUser(res.data.memberId);
    }
    return res;
  };

  useEffect(() => {
    callGroupMemberList();
  }, [groupId]);

  return (
    <View style={styles.container}>
      <GroupMemberList
        groupMember={groupMember}
        groupId={groupId}
        callRejectMember={callRejectMember}
      />
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
