import {
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  View,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./../../constants/color";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const GroupDetailHeader = ({ handlePresentModalPress, image }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.header}>
      <Image style={styles.image} source={{ uri: image }} />
      <View style={styles.iconContainer}>
        <Ionicons
          name="chevron-back"
          size={28}
          color={GlobalColors.colors.secondary500}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Ionicons
          name="settings"
          size={28}
          color={GlobalColors.colors.secondary500}
          onPress={handlePresentModalPress}
        />
      </View>
    </SafeAreaView>
  );
};

export default GroupDetailHeader;

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
