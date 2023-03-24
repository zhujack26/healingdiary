import { FlatList } from "react-native";
import GroupMemberAllowListItem from "./GroupMemberAllowListItem";

const DATA = [
  { id: 1, uri: "https://picsum.photos/id/1/200/300", nickname: "닉네임1" },
  { id: 2, uri: "https://picsum.photos/id/2/200/300", nickname: "닉네임2" },
  { id: 3, uri: "https://picsum.photos/id/3/200/300", nickname: "닉네임3" },
  { id: 4, uri: "https://picsum.photos/id/4/200/300", nickname: "닉네임4" },
  { id: 5, uri: "https://picsum.photos/id/5/200/300", nickname: "닉네임5" },
];

const GroupMemberAllowList = () => {
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => <GroupMemberAllowListItem data={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ marginBottom: 48 }}
    />
  );
};

export default GroupMemberAllowList;
