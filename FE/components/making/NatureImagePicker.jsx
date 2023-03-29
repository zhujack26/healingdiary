import { useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";

const NatureImagePicker = ({ onSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImagePress = (image) => {
    setSelectedImage(image);
    onSelect(image);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <TouchableOpacity
          onPress={() =>
            handleImagePress(require("../../assets/images/SAMPLE2.png"))
          }
        >
          <Image
            source={require("../../assets/images/SAMPLE2.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress(require("../../assets/images/SAMPLE2.png"))
          }
        >
          <Image
            source={require("../../assets/images/SAMPLE2.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress(require("../../assets/images/SAMPLE2.png"))
          }
        >
          <Image
            source={require("../../assets/images/SAMPLE2.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress(require("../../assets/images/SAMPLE2.png"))
          }
        >
          <Image
            source={require("../../assets/images/SAMPLE2.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress(require("../../assets/images/SAMPLE2.png"))
          }
        >
          <Image
            source={require("../../assets/images/SAMPLE2.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            handleImagePress(require("../../assets/images/SAMPLE2.png"))
          }
        >
          <Image
            source={require("../../assets/images/SAMPLE2.png")}
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
    height: "90%",
    top: 100,
  },
  container1: {
    paddingTop: 100,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: GlobalColors.colors.primary500,
  },
});

export default NatureImagePicker;
