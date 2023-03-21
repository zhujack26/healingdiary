import { View, StyleSheet } from "react-native";
import Hashtag from "../components/making/Hashtag";
import { GlobalColors } from "../constants/color";

const MakingHashScreen = ({ route }) => {
  const { categoryId, categoryName, allTags } = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.inform}>
        <Hashtag 
        categoryId={categoryId}
        categoryName={categoryName}
        allTags={allTags}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
  },
  inform: {
    alignItems: "center",
    top: 100,
    width: 400,
    width: "100%",
    height: "90%",
    backgroundColor: GlobalColors.colors.white500,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
export default MakingHashScreen;
