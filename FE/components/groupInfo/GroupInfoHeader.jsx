import {
  SafeAreaView,
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./../../constants/color";

const { width } = Dimensions.get("window");

const GroupInfoHeader = ({
  handlePresentModalPress,
  handleCloseModalPress,
  navigation,
}) => {
  const navigateAndCloseModal = () => {
    navigation.goBack();
    handleCloseModalPress();
  };
  return (
    <SafeAreaView style={styles.header}>
      <Image
        style={styles.image}
        source={require("../../assets/images/SAMPLE2.png")}
      />
      <View style={styles.iconContainer}>
        <Ionicons
          name="chevron-back"
          size={28}
          color={GlobalColors.colors.secondary500}
          onPress={navigateAndCloseModal}
        />

        <Ionicons
          name="ellipsis-horizontal"
          size={28}
          color={GlobalColors.colors.secondary500}
          onPress={handlePresentModalPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupInfoHeader;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 265,
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
  },
  iconContainer: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    position: "absolute",
    top: Platform.OS === "ios" ? 56 : 32,
  },
});
