import GroupInfoUpdate from "../components/groupInfoUpdate/GroupInfoUpdate";

const GroupInfoUpdateScreen = ({ route }) => {
  const isEdit = route.params?.isEdit ?? false;
  return <GroupInfoUpdate isEdit={isEdit} />;
};

export default GroupInfoUpdateScreen;
