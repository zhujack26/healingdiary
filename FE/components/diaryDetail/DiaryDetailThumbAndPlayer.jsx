import { View, Image, Dimensions, StyleSheet, Pressable } from "react-native";
import { GlobalColors } from "../../constants/color";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const DiaryDetailThumbAndPlayer = ({
  navigationGoBack,
  playSound,
  stopSound,
  isPlaying,
  diary,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: diary.imageUrl }} />
        <Pressable style={styles.circle}>
          <Ionicons
            name={isPlaying ? "ios-stop" : "play"}
            size={24}
            color={GlobalColors.colors.white500}
            onPress={isPlaying ? stopSound : playSound}
          />
        </Pressable>
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name="chevron-back"
          size={28}
          color={GlobalColors.colors.secondary500}
          onPress={navigationGoBack}
        />
      </View>
    </>
  );
};

export default DiaryDetailThumbAndPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: width,
    height: height / 1.8,
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
