import { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { AntDesign } from "@expo/vector-icons";

const DefalutImagePicker = ({ onSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImagePress = (image) => {
    setSelectedImage(image);
    onSelect(image);
  };

  return (
    <>
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
    </>
  );
};

const styles = StyleSheet.create({
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
