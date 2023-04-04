import GroupMember from "./../components/groupMember/GroupMember";

const GroupMemberScreen = ({ route }) => {
  const { groupId } = route.params.isEdit;

  return <GroupMember groupId={groupId} />;
};

export default GroupMemberScreen;
