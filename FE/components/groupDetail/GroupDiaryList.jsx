import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GroupDiaryListItem from "./GroupDiaryListItem";
import GroupIntroduction from "./GroupIntroduction";
import ExitModal from "./ExitModal";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    hashtags: ["#해시태그 ", "#해시태그 ", "#해시태그 "],
    title: "소모임 이이름",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    hashtags: ["#해시태그 ", "#해시태그 ", "#해시태그 "],
    title: "소모임 이이름",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    hashtags: ["#해시태그 ", "#해시태그 ", "#해시태그 "],
    title: "소모임 이이름",
  },
  {
    id: "58694a0f-323da1-471f-bd96-145571e29d72",
    hashtags: ["#해시태그 ", "#해시태그 ", "#해시태그 "],
    title: "소모임 이이름",
  },
  {
    id: "58694a0f-3113da1-471f-bd96-145571e29d72",
    hashtags: ["#해시태그 ", "#해시태그 ", "#해시태그 "],
    title: "소모임 이이름",
  },
];

const GroupDiaryList = ({ exitModalVisible, exitCloseModalPress }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      style={styles.scrollContainer}
      data={DATA}
      renderItem={({ item }) => <GroupDiaryListItem data={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={<GroupIntroduction navigation={navigation} />}
      ListFooterComponent={
        <ExitModal
          exitModalVisible={exitModalVisible}
          exitCloseModalPress={exitCloseModalPress}
        />
      }
    />
  );
};

export default GroupDiaryList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  scrollContainer: {
    flex: 1,
    marginTop: 32,
    paddingHorizontal: 16,
  },
});
