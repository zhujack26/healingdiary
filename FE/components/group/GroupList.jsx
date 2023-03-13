import { Pressable } from "react-native";
import { StatusBar, FlatList, SafeAreaView, View, StyleSheet, Image, Text } from "react-native";
import { GlobalColors } from "../../constants/color";

import Title from "../../ui/Title";

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Image
      source={require("../../assets/images/SAMPLE1.png")}
      style={styles.image}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

const GroupList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text >
        전체 소모임
      </Text>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    
  },
  item: {
    backgroundColor: GlobalColors.colors.white500,
    padding: 30,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 12,
  },
  title: {
    fontSize: 12,
  },
});

export default GroupList;

