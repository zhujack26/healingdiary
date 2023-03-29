import { FlatList } from "react-native";
import GroupItem from "./GroupItem";

const DATA = {
  content: [
    {
      clubId: 0,
      clubImageUrl: require("../../assets/images/SAMPLE2.png"),
      name: "소모임이름",
      tags: ["string", "string"],
    },
    {
      clubId: 1,
      clubImageUrl: require("../../assets/images/SAMPLE3.png"),
      name: "소모임이름2",
      tags: ["string", "string", "string"],
    },
    {
      clubId: 2,
      clubImageUrl: require("../../assets/images/SAMPLE5.png"),
      name: "소모임이름3",
      tags: ["string", "string", "string"],
    },
  ],
};

const MyGroupList = () => {
  return (
    <>
      <FlatList
        data={DATA.content}
        renderItem={({ item }) => <GroupItem content={item} />}
        keyExtractor={(item) => item.clubId}
      />
    </>
  );
};

export default MyGroupList;
