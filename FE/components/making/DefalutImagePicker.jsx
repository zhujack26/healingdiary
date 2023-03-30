import { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const DefalutImagePicker = ({ onSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImagePress = (image) => {
    setSelectedImage(image);
    onSelect(image);
  };
  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity onPress={pickImageFromGallery}>
          <View style={styles.view}>
            <AntDesign name="plus" size={48} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/1.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/1.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/3.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/3.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/1.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/1.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/3.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/3.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/1.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/1.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress({
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            })
          }
        >
          <Image
            source={{
              uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/2.jpeg",
            }}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: GlobalColors.colors.white500,
    height: "85%",
    top: 100,
  },
  container1: {
    paddingTop: 70,
    paddingLeft: 5,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  view: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: GlobalColors.colors.gray400,
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    margin: 3,
  },
});

export default DefalutImagePicker;
