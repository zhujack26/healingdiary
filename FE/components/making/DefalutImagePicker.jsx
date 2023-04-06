import { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

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
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/4.jpg",
          })
        }
      >
        <Image
          source={{
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/4.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/5.jpg",
          })
        }
      >
        <Image
          source={{
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/5.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/6.jpg",
          })
        }
      >
        <Image
          source={{
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/6.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/7.jpg",
          })
        }
      >
        <Image
          source={{
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/7.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/8.jpg",
          })
        }
      >
        <Image
          source={{
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/8.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/9.jpg",
          })
        }
      >
        <Image
          source={{
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/9.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/10.jpg",
          })
        }
      >
        <Image
          source={{
            uri: "https://bje-s3-bucket.s3.ap-northeast-2.amazonaws.com/diary_default_image/10.jpg",
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    margin: 3,
  },
});

export default DefalutImagePicker;
