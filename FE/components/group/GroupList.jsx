import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import Title from "../../ui/Title";
import { DATA } from "../../model/DataGroup";
import GroupItem from "./GroupItem";

const GroupList = () => {
  const navigation = useNavigation();

  return (
    <>
      <Title>전체 소모임</Title>
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
    </>
  );
};

const styles = StyleSheet.create({});

export default GroupList;
