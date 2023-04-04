import { FlatList } from "react-native";
import GroupMemberAllowListItem from "./GroupMemberAllowListItem";

const GroupMemberAllowList = ({
  users,
  groupId,
  callApprovalMember,
  callRejectMember,
}) => {
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <GroupMemberAllowListItem
          data={item}
          groupId={groupId}
          callApprovalMember={callApprovalMember}
          callRejectMember={callRejectMember}
        />
      )}
      keyExtractor={(item) => item.clubMemberId}
      contentContainerStyle={{ marginBottom: 48 }}
    />
  );
};

export default GroupMemberAllowList;
