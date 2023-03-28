import { FlatList, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GroupItem from "../group/GroupItem";

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

const SearchGroup = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA.content}
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
