import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getClubList } from "../../api/group";
import GroupItem from "./GroupItem";

const GroupList = ({}) => {
  const navigation = useNavigation();
  const [clubList, setClubList] = useState([]);
  const getClub = async () => {
    const res = await getClubList();
    setClubList(res);
  };

  useEffect(() => {
    getClub();
  }, []);

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

export default React.memo(GroupList);
