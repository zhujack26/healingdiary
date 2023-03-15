import { View, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const AddFile = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images, //업로드 파일 타입
    allowsEditing: false, // 자르기 등의 편집 기능
    quality: 1,  //이미지 압축 여부, 1이 가장 높은 품질
    aspect: [1, 1]  //이미지 비율 설정
  });
  if (result.cancelled) {
    return null;
  }
  console.log(result);
  setImageUrl(result.uri);
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={uploadImage} style={styles.box}>
        <AntDesign name="plus" size={48} color="black" source={{ uri: imageUrl }}/>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    width: 250,
    height: 400,
    borderColor: GlobalColors.colors.white500,
    elevation: 3,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
});

export default AddFile;
