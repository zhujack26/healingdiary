import {
  FlatList,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { GlobalColors } from "../constants/color";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const DATA = [
  {
    id: "1",
    title: "오늘 날짜",
  },
];
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const WriteScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <Item title={item.title} />}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.inform}>
          <MaterialCommunityIcons name="record-circle-outline" size={72} color="red" />
        </View>
      </View>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
    marginTop: StatusBar.currentHeight || 0,
  },
  body: {
    top: 30,
    alignItems: "center",
  },

  item: {
    alignItems: "center",
    backgroundColor: GlobalColors.colors.white500,
    padding: 5,
    height: 30,
    width: 130,
    borderRadius: 20,
  },
  inform: {
    alignItems: "center",
    top: 80,
    width: 400,
    height: 800,
    backgroundColor: GlobalColors.colors.white500,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 12,
  },
});

export default WriteScreen;
