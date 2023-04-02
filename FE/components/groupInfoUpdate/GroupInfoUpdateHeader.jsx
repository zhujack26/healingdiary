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
import AddFile from "./AddFile";

const { width, height } = Dimensions.get("window");

const GroupInfoUpdateHeader = ({
  isEdit,
  navigation,
  image,
  setImage,
  pickImage,
  pickImageFromGallery,
  modalVisible,
  setModalVisible,
  registGroup,
}) => {
  return (
    <SafeAreaView style={styles.header}>
      {/*
      isEdit 값에 따라 이미지 또는 +아이콘을 렌더링한다.
      - isEdit: boolean 값으로, 수정 모드일 경우 true, VIEW 모드일 경우 false
      - 수정 모드: "기존 소모임 대표 이미지" 파일을 보여줌.
      - 추가 모드: "+" 아이콘을 가져와 사진을 추가 할 수 있는뷰에 보여줍니다.
      */}
      {isEdit ? (
        <Image
          style={styles.image}
          source={require("../../assets/images/SAMPLE2.png")}
        />
      ) : (
        <Pressable style={styles.defaultImage}>
          <AddFile
            image={image}
            setImage={setImage}
            pickImage={pickImage}
            pickImageFromGallery={pickImageFromGallery}
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        </Pressable>
      )}

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

        <Pressable onPress={registGroup}>
          <Text style={styles.text}>{isEdit ? "수정" : "등록"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default GroupInfoUpdateHeader;

const styles = StyleSheet.create({
  header: {
    width: width,
    height: height / 3,
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

  defaultImage: {
    width: "100%",
    height: "100%",
    backgroundColor: GlobalColors.colors.gray500,
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

  text: {
    color: GlobalColors.colors.secondary500,
    lineHeight: 16,
  },
});
