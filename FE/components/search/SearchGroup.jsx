import { FlatList, View, StyleSheet } from "react-native";
import { DATA } from "../../model/DataGroup";
import { useNavigation } from "@react-navigation/native";
import GroupItem from "../group/GroupItem";

const SearchGroup = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <GroupItem
            title={item.title}
            hashtag={item.hashtag}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
export default SearchGroup;
