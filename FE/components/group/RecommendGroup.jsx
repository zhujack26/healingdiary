import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getRecommendGroup } from "./../../api/group";
import { useState, useEffect } from "react";
import GroupItem from "./GroupItem";

const RecommendGroup = () => {
  const navigation = useNavigation();
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
      renderItem={({ item }) => <GroupItem content={item} navigation={navigation}/>}
      keyExtractor={(item) => item.clubId}
    />
  );
};

export default RecommendGroup;
