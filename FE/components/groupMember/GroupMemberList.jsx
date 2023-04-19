import { FlatList, StyleSheet, Text, View } from "react-native";
import GroupMemberListItem from "./GroupMemberListItem";

const NotGroupMember = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>현재 모임에 참여한 인원이 없습니다!</Text>
    </View>
  );
};

const GroupMemberList = ({
  groupMember,
  groupId,
  memberId,
  callRejectMember,
  host = { host },
}) => {
  if (groupMember?.length === 0) return <NotGroupMember />;
  return (
    <FlatList
      data={groupMember}
      renderItem={({ item }) => (
        <GroupMemberListItem
          data={item}
          groupId={groupId}
          memberId={memberId}
          callRejectMember={callRejectMember}
          host={host}
        />
      )}
      keyExtractor={(item) => item.memberId}
      contentContainerStyle={{ marginBottom: 48 }}
    />
  );
};

export default GroupMemberList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 18,
  },
});
