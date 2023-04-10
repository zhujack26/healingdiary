import { FlatList } from "react-native";
import { useState, useCallback } from "react";
import { getMyClubList } from "../../api/group";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import GroupItem from "./GroupItem";

const MyGroupList = () => {
  const navigation = useNavigation();
  const [clubList, setClubList] = useState([]);
  const getClub = async () => {
    const res = await getMyClubList();
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

export default MyGroupList;
