import { useState } from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import {
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
} from "../../constants/defaultImage";
const DefalutImage = ({ onSelect }) => {
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
            uri: img1,
          })
        }
      >
        <Image
          source={{
            uri: img1,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img2,
          })
        }
      >
        <Image
          source={{
            uri: img2,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img3,
          })
        }
      >
        <Image
          source={{
            uri: img3,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img4,
          })
        }
      >
        <Image
          source={{
            uri: img4,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img5,
          })
        }
      >
        <Image
          source={{
            uri: img5,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img6,
          })
        }
      >
        <Image
          source={{
            uri: img6,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img7,
          })
        }
      >
        <Image
          source={{
            uri: img7,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img8,
          })
        }
      >
        <Image
          source={{
            uri: img8,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img9,
          })
        }
      >
        <Image
          source={{
            uri: img9,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          handleImagePress({
            uri: img10,
          })
        }
      >
        <Image
          source={{
            uri: img10,
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

export default DefalutImage;
