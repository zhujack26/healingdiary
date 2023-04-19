import GroupDetail from "../components/groupDetail/GroupDetail";

const GroupDetailScreen = ({ route }) => {
  const { groupId } = route.params;
  return <GroupDetail groupId={groupId} />;
};

export default GroupDetailScreen;
