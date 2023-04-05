import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { getMyClubList } from "../../api/group";
import { useNavigation } from "@react-navigation/native";
import GroupItem from "./GroupItem";

const MyGroupList = () => {
  const navigation = useNavigation();
  const [clubList, setClubList] = useState([]);
  const getClub = async () => {
    const res = await getMyClubList();
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

export default MyGroupList;
