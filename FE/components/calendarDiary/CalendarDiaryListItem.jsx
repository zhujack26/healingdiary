import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { GlobalColors } from "../../constants/color";

const { width, height } = Dimensions.get("window");

const CalendarDiaryListItem = ({ emotion, image }) => {
  return (
    <>
      <Pressable style={styles.diary}>
        <View style={styles.date}>
          <Text style={styles.days}>26</Text>
          <Text style={styles.dayOf}>일</Text>
          <Text>{emotion.value}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>
      </Pressable>
    </>
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
