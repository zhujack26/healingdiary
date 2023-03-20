import { Image, View, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";

const AddFile = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // const result = await ImagePicker.launchImageLibraryAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.Images, //업로드 파일 타입
  //   allowsEditing: false, // 자르기 등의 편집 기능
  //   quality: 1,  //이미지 압축 여부, 1이 가장 높은 품질
  //   aspect: [1, 1]  //이미지 비율 설정
  // });

  return (
      <TouchableOpacity onPress={pickImage} style={styles.container}>
        {image && <Image source={{ uri: image }} style={styles.img} />}
        {!image && <AntDesign name="plus" size={48} color="black" />}
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10,
    width: 250,
    height: 350,
    borderWidth: 1,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    shadowOpacity: 0.5,
    borderColor: GlobalColors.colors.white500,
    elevation: 4,
    backgroundColor: GlobalColors.colors.white500
  },
  img: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    shadowOpacity: 0,
    width: "100%",
    height: "100%",
  }
});

export default AddFile;
