import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "./../../constants/color";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const GroupInfoUpdateHeader = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.header}>
      <Image
        style={styles.image}
        source={require("../../assets/images/SAMPLE2.png")}
      />
      <Pressable style={styles.updateContainer}>
        <Ionicons name="copy-outline" size={24} color="black" />
      </Pressable>

      <View style={styles.iconContainer}>
        <Ionicons
          name="chevron-back"
          size={28}
          color={GlobalColors.colors.secondary500}
          onPress={() => navigation.goBack()}
        />

        <Pressable onPress={() => {}}>
          <Text style={styles.updateText}>수정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default GroupInfoUpdateHeader;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: 265,
  },

  updateContainer: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 48,
    height: 48,
    backgroundColor: GlobalColors.colors.gray400,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
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

  updateText: {
    color: GlobalColors.colors.secondary500,
    lineHeight: 16,
  },
});
