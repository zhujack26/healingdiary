import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import { GlobalColors } from "../../constants/color";
import { useState } from "react";
const { width } = Dimensions.get("window");

const RecommentGroupListItem = ({ item }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("groupDetail", { groupId: item.clubId });
      }}
    >
      {isLoading && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          color={GlobalColors.colors.primary500}
          size="large"
        />
      )}
      <View style={styles.container}>
        <View>
          <Image
            source={{ uri: item.clubImageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.hashtags}>
            {item.tags?.map((tag, index) => (
              <View style={styles.hashtag} key={index}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
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
