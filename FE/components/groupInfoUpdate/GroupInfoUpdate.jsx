import { useNavigation } from "@react-navigation/native";
import GroupInfoUpdateHeader from "./GroupInfoUpdateHeader";
import GroupInfoUpdateIntro from "./GroupInfoUpdateIntro";

const GroupInfoUpdate = ({ isEdit }) => {
  const navigation = useNavigation();
  return (
    <>
      <GroupInfoUpdateHeader isEdit={isEdit} navigation={navigation} />
      <GroupInfoUpdateIntro isEdit={isEdit} />
    </>
  );
};

export default GroupInfoUpdate;
