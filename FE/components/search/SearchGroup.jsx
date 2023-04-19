import { FlatList, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { searchGroup } from "../../api/group";
import GroupItem from "../group/GroupItem";

const SearchGroup = ({ search }) => {
  const navigation = useNavigation();
  const [clubList, setClubList] = useState([]);

  const callSearchGroup = async () => {
    const res = await searchGroup(search);
    setClubList(res.data);
  };

  useEffect(() => {
    callSearchGroup();
  }, [search]);

  return (
    <View style={styles.container}>
      <FlatList
        data={clubList.content}
        renderItem={({ item }) => (
          <GroupItem content={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.clubId}
      />
    </View>
  );
};

export default SearchGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
