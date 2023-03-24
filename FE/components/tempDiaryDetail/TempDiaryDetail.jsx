import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import Comment from "./Comment";

const { width, height } = Dimensions.get("window");

const TempDiaryDetail = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* 플레이어 창 */}
      <View style={styles.header}>
        <Image
          style={styles.image}
          source={require("../../assets/images/SAMPLE3.png")}
        />
        <View style={styles.circle}>
          <Ionicons
            name="play"
            size={24}
            color={GlobalColors.colors.white500}
          />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name="chevron-back"
          size={28}
          color={GlobalColors.colors.secondary500}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      {/* 해시태그 */}
      <View>
        <Text>해시태그</Text>
      </View>
      {/* 댓글창 */}
      <Comment />
    </SafeAreaView>
  );
};

export default TempDiaryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: width,
    height: height / 2.5,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  circle: {
    position: "absolute",
    bottom: 15,
    right: 15,
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    borderColor: GlobalColors.colors.white500,
    borderWidth: 3,
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
