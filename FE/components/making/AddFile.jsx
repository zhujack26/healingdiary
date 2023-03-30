import React, { useState } from "react";
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
import DefalutImagePicker from "./DefalutImagePicker";
import { Feather } from "@expo/vector-icons";

const AddFile = () => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const pickImage = () => {
    setModalVisible(true);
  };
  return (
    <>
      <TouchableOpacity onPress={pickImage} style={styles.container}>
        {image && <Image source={image} style={styles.img} />}
        {!image && <AntDesign name="plus" size={48} color="black" />}
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <Text style={styles.text}> 배경 이미지</Text>
          <Feather
            name="x"
            size={24}
            color="black"
            onPress={() => setModalVisible(false)}
            style={styles.closeIcon}
          />
          <DefalutImagePicker
            onSelect={(selectedImage) => {
              setImage(selectedImage);
              setModalVisible(false);
            }}
          />
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
  img: {
    shadowOpacity: 0,
    width: "100%",
    height: "100%",
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeIcon: {
    position: "absolute",
    top: 170,
    right: 20,
    zIndex: 999,
  },
  text: {
    position: "absolute",
    top: 170,
    zIndex: 999,
    fontFamily: "KoddiUDOnGothic-ExtraBold",
    fontSize: 20,
  },
});

export default AddFile;
