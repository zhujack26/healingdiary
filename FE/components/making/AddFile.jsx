import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

const AddFile = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

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
    backgroundColor: GlobalColors.colors.white500,
  },
  img: {
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    shadowOpacity: 0,
    width: "100%",
    height: "100%",
  },
});

export default AddFile;
