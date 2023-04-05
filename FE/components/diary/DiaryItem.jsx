import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { GlobalColors } from "./../../constants/color";
import { useState } from "react";

const { width, height } = Dimensions.get("window");

const DiaryItem = ({ content, navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.imageContainer}>
        {isLoading && (
          <ActivityIndicator
            style={StyleSheet.absoluteFill}
            color={GlobalColors.colors.primary500}
            size="large"
          />
        )}
        <Image
          source={{ uri: content?.imageUrl }}
          style={styles.image}
          onLoadEnd={handleImageLoad}
        />
        {!isLoading && (
          <View style={styles.hashtags}>
            {!content?.tags.includes(content?.emotion.value) && (
              <View style={styles.hashtag}>
                <Text style={styles.tagText}>#{content?.emotion.value}</Text>
              </View>
            )}
            {content?.tags.map((hashtag, index) => (
              <View style={styles.hashtag} key={index}>
                <Text style={styles.tagText}>#{hashtag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default DiaryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height / 2.1,
    flexDirection: "row",
    borderRadius: 16,
    elevation: 5,
    shadowColor: "#f9f9f9",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  imageContainer: {
    width: width / 1.3,
    height: "100%",
    borderRadius: 16,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },

  hashtags: {
    minWidth: 75,
    height: 25,
    flexDirection: "row",
    position: "absolute",
    top: 15,
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
});
