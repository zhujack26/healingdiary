import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import Slider from "@react-native-community/slider";

const deviceWidth = Dimensions.get("window").width - 50;
const SoundPlayer = () => {
  return (
    <View style={styles.playlist}>
      <View style={styles.emotionContainer}>
        <Text> 　</Text>
        <Image
          source={require("../../assets/images/icons/cursing.png")}
          style={styles.emotion}
        />
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </View>
      <View style={styles.soundContainer}>
        <View style={styles.artworkWrapper}>
          <Image
            source={require("../../assets/images/SAMPLE4.png")}
            style={styles.artwork}
          />
        </View>
        <View style={styles.hashtags}>
          <View style={styles.hashtag}>
            <Text style={styles.hashtagText}>#해시태그</Text>
          </View>
          <View style={styles.hashtag}>
            <Text style={styles.hashtagText}>#해시태그</Text>
          </View>
          <View style={styles.hashtag}>
            <Text style={styles.hashtagText}>#해시태그</Text>
          </View>
        </View>
        <View>
          <Slider
            style={styles.progressContainer}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#EDAD79"
            minimumTrackTintColor="#EDAD79"
            maximumTrackTintColor={GlobalColors.colors.gray400}
            onSlidingComplete={() => {}}
          />
          <View style={styles.progressLabelContainer}>
            <Text style={styles.progressLabelText}>0:00</Text>
            <Text style={styles.progressLabelText}>3:00</Text>
          </View>
        </View>
        <View style={styles.soundControlls}>
          <Pressable onPress={() => {}}>
            <Ionicons
              name="play-skip-back-outline"
              size={35}
              color={GlobalColors.colors.secondary500}
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Ionicons
              name="ios-pause-circle"
              size={75}
              color={GlobalColors.colors.secondary500}
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Ionicons
              name="play-skip-forward-outline"
              size={35}
              color={GlobalColors.colors.secondary500}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SoundPlayer;

const styles = StyleSheet.create({
  playlist: {
    flex: 6,
    backgroundColor: GlobalColors.colors.white500,
    width: "100%",
    borderTopRightRadius: 62,
    borderTopLeftRadius: 62,
    alignItems: "center",
  },
  emotionContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
  },
  emotion: {
    width: 35,
    height: 35,
  },
  soundContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  artworkWrapper: {
    width: 260,
    height: 260,
    marginBottom: 25,
    elevation: 5,
    shadowColor: GlobalColors.colors.black500,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0,
    shadowRadius: 3.84,
  },
  artwork: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  hashtags: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  hashtag: {
    minWidth: 85,
    height: 30,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  hashtagText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.white500,
    fontSize: 12,
    padding: 4,
  },
  progressContainer: {
    width: deviceWidth,
    height: 40,
    marginTop: 25,
    flexDirection: "row",
  },
  progressLabelContainer: {
    width: deviceWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabelText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    color: GlobalColors.colors.black500,
  },
  soundControlls: {
    width: deviceWidth - 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
