import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { FlatList } from "react-native";
import { useState, useCallback } from "react";
import { getClubList } from "../../api/group";
import GroupItem from "./GroupItem";

const GroupList = ({}) => {
  const navigation = useNavigation();
  const [clubList, setClubList] = useState([]);
  const getClub = async () => {
    const res = await getClubList();
    setClubList(res);
  };

  useFocusEffect(
    useCallback(() => {
      getClub();
    }, [])
  );

  return (
    <>
      <FlatList
        data={clubList.content}
        renderItem={({ item }) => (
          <GroupItem content={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.clubId}
      />
    </>
  );
};

export default GroupList;
