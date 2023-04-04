import { View, StyleSheet } from "react-native";
import { getGroupMemebrList } from "../../api/group";
import { useEffect, useState } from "react";
import GroupMemberList from "./GroupMemberList";

const GroupMember = ({ groupId }) => {
  const [groupMember, setGroupMember] = useState([]);
  const getGroupMember = async () => {
    const res = await getGroupMemebrList(groupId);
    setGroupMember(res);
  };

  useEffect(() => {
    getGroupMember();
  }, [groupId]);

  return (
    <View style={styles.container}>
      <GroupMemberList groupMember={groupMember.content} />
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
