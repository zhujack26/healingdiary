import GroupMemberAllow from "../components/groupMemberAllow/GroupMemberAllow";

const GroupMemberAllowScreen = ({ route }) => {
  const { groupId } = route.params.isEdit;
  return <GroupMemberAllow groupId={groupId} />;
};

export default GroupMemberAllowScreen;
