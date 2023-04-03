import { StyleSheet, FlatList, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalColors } from "../../constants/color";

import GroupDiaryListItem from "./GroupDiaryListItem";
import GroupIntroduction from "./GroupIntroduction";
import ExitModal from "./ExitModal";

const GroupDiaryList = ({
  exitModalVisible,
  exitCloseModalPress,
  groupData,
  groupId,
  diaries,
}) => {
  const navigation = useNavigation();
  const NotDiary = () => {
    return (
      <View style={styles.notContainer}>
        <Text style={styles.text}>모임에 작성된 일기가 없습니다!</Text>
      </View>
    );
  };
  return (
    <FlatList
      style={styles.scrollContainer}
      data={diaries.content}
      renderItem={({ item }) => (
        <GroupItem data={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <GroupIntroduction
          navigation={navigation}
          groupData={groupData}
          groupId={groupId}
        />
      }
      ListFooterComponent={
        <ExitModal
          exitModalVisible={exitModalVisible}
          exitCloseModalPress={exitCloseModalPress}
        />
      }
      ListEmptyComponent={<NotDiary />}
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

  notContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.black500,
    fontSize: 16,
  },
});
