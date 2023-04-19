import GroupMember from "./../components/groupMember/GroupMember";

const GroupMemberScreen = ({ route }) => {
  const { groupId, host } = route.params.isEdit;
  return <GroupMember groupId={groupId} host={host} />;
};

export default GroupMemberScreen;
