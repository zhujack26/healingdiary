import { FlatList } from "react-native";
import { getRecommendGroup } from "./../../api/group";
import { useState, useEffect } from "react";
import GroupItem from "./GroupItem";

const RecommendGroup = () => {
  const [clubList, setClubList] = useState([]);
  const getRecoGroup = async () => {
    const res = await getRecommendGroup();
    setClubList(res);
  };

  useEffect(() => {
    getRecoGroup();
  }, []);

  return (
    <FlatList
      data={clubList.content}
      renderItem={({ item }) => <GroupItem content={item} />}
      keyExtractor={(item) => item.clubId}
    />
  );
};

export default RecommendGroup;
