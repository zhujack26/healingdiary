import { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import DefalutImage from "./DefalutImage";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const AddImage = (props) => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const pickImage = () => {
    setModalVisible(true);
  };
  const pickImageFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 0.05,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      const newImage = { uri: result.assets[0].uri };
      setImage(newImage);
      if (props.onSelectedImage) {
        props.onSelectedImage(newImage);
      }
    }
    setModalVisible(false);
  };
  return (
    <>
      <TouchableOpacity onPress={pickImage} style={styles.container}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.img} />
        ) : (
          <AntDesign name="plus" size={48} color="black" />
        )}
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <View style={styles.container1}>
            <Text style={styles.text}> 배경 이미지</Text>
            <Feather
              name="x"
              size={24}
              color="black"
              onPress={() => setModalVisible(false)}
              style={styles.closeIcon}
            />
            <TouchableOpacity onPress={pickImageFromGallery}>
              <View style={styles.view}>
                <AntDesign name="plus" size={48} color="black" />
              </View>
            </TouchableOpacity>
            <DefalutImage
              onSelect={(selectedImage) => {
                setImage(selectedImage);
                setModalVisible(false);
                if (props.onSelectedImage) {
                  props.onSelectedImage(selectedImage);
                }
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    marginBottom: 10,
    width: "80%",
    height: "60%",
    borderWidth: 1,
    shadowOpacity: 0.5,
    borderColor: GlobalColors.colors.white500,
    elevation: 4,
    backgroundColor: GlobalColors.colors.white500,
  },
  container1: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: GlobalColors.colors.white500,
    height: "83%",
    width: "100%",
    top: 160,
    justifyContent: "center",
    paddingTop: 120,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  img: {
    shadowOpacity: 0,
    width: "100%",
    height: "100%",
  },
  modalView: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeIcon: {
    position: "absolute",
    paddingTop: 20,
    right: 20,
  },
  text: {
    position: "absolute",
    paddingTop: 20,
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 20,
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
});

export default AddImage;
