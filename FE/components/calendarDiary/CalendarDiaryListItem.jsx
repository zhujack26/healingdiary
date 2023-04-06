import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import { BAD, CALM, HAPPY, PLEASURE, UNHAPPY } from "../../constants/emtion";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const CalendarDiaryListItem = ({ content }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.diary}
      onPress={() => {
        navigation.navigate("diaryDetail", { diaryId: content.diaryId });
      }}
    >
      <View style={styles.date}>
        {content?.emotion.emotionCode === 1 && (
          <Image source={{ uri: UNHAPPY }} style={styles.emotionImage} />
        )}
        {content?.emotion.emotionCode === 2 && (
          <Image source={{ uri: BAD }} style={styles.emotionImage} />
        )}
        {content?.emotion.emotionCode === 3 && (
          <Image source={{ uri: CALM }} style={styles.emotionImage} />
        )}
        {content?.emotion.emotionCode === 4 && (
          <Image source={{ uri: PLEASURE }} />
        )}
        {content?.emotion.emotionCode === 5 && (
          <Image source={{ uri: HAPPY }} style={styles.emotionImage} />
        )}
      </View>

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: content?.imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
};

export default CalendarDiaryListItem;

const styles = StyleSheet.create({
  diary: {
    width: width - 20,
    height: height / 4.5,
    backgroundColor: GlobalColors.colors.white500,
    flexDirection: "row",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 8,
  },

  emotionImage: {
    width: 45,
    height: 45,
  },

  date: {
    width: "25%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  days: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 24,
  },

  dayOf: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 16,
  },

  imageContainer: {
    width: "75%",
    height: "100%",
    borderRadius: 16,
  },

  image: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
});
