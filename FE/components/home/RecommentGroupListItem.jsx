import {
  Pressable,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { GlobalColors } from "../../constants/color";

const { width } = Dimensions.get("window");

const RecommentGroupListItem = ({ item }) => {
  const { description, image, name, hashtags } = item;
  return (
    <Pressable>
      <View style={styles.container}>
        <View>
          <Image source={image} style={styles.image} resizeMode="cover" />
          <View style={styles.hashtags}>
            {hashtags.map((hashtag, index) => (
              <View style={styles.hashtag} key={index}>
                <Text style={styles.tagText}>#{hashtag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RecommentGroupListItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 26,
    justifyContent: "center",
  },

  image: {
    width: width - 35,
    height: 200,
    borderRadius: 12,
    marginRight: 4,
  },

  hashtags: {
    minWidth: 75,
    height: 25,
    flexDirection: "row",
    position: "absolute",
    top: 10,
    left: 15,
    justifyContent: "center",
  },

  hashtag: {
    backgroundColor: GlobalColors.colors.white500,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  tagText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.primary500,
    paddingHorizontal: 10,
    textAlign: "center",
    textAlignVertical: "center",
  },

  infoContainer: {
    position: "absolute",
    bottom: 10,
    left: 15,
  },

  title: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 16,
    color: GlobalColors.colors.white500,
  },

  description: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 12,
    color: GlobalColors.colors.white500,
  },
});
