import { FlatList } from "react-native";
import GroupMemberAllowListItem from "./GroupMemberAllowListItem";

const GroupMemberAllowList = ({ users, memberApproval }) => {
  return (
    <FlatList
      data={users.content}
      renderItem={({ item }) => (
        <GroupMemberAllowListItem data={item} memberApproval={memberApproval} />
      )}
      keyExtractor={(item) => item.clubMemberId}
      contentContainerStyle={{ marginBottom: 48 }}
    />
  );
};

export default GroupMemberAllowList;
