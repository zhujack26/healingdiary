import { useNavigation } from "@react-navigation/native";
import {
  Pressable,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { GlobalColors } from "../../constants/color";

const { width } = Dimensions.get("window");

const RecentDiaryListItem = ({ item }) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const navigation = useNavigation();
  return (
    <View style={styles.recentDiary}>
      {isLoading && (
        <ActivityIndicator
          style={StyleSheet.absoluteFill}
          color={GlobalColors.colors.primary500}
          size="large"
        />
      )}
      <Pressable
        onPress={() => {
          navigation.navigate("diaryDetail", { diaryId: item.diaryId });
        }}
      >
        <Image
          source={{ uri: item?.imageUrl }}
          style={styles.image}
          onLoadEnd={handleImageLoad}
        />
        <View style={styles.hashtag}>
          <Text style={styles.tagText}>#{item?.emotion.value}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default RecentDiaryListItem;

const styles = StyleSheet.create({
  recentDiary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },

  image: {
    position: "relative",
    width: width / 3,
    height: width / 3,
    borderRadius: 12,
  },

  hashtag: {
    minWidth: 75,
    height: 25,
    borderRadius: 16,
    backgroundColor: GlobalColors.colors.white500,
    position: "absolute",
    top: 10,
    left: 10,
  },

  tagText: {
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 12,
    color: GlobalColors.colors.primary500,
    textAlign: "center",
    marginTop: 5,
  },
});
