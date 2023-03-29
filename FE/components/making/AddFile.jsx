import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";
import * as ImagePicker from "expo-image-picker";
import DefalutImagePicker from "./DefalutImagePicker";
import ColorImagePicker from "./ColorImagePicker";
import NatureImagePicker from "./NatureImagePicker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const AddFile = () => {
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [showNatureImagePicker, setShowNatureImagePicker] = useState(false);
  const [showColorImagePicker, setShowColorImagePicker] = useState(false);

  const pickImage = () => {
    setModalVisible(true);
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
    <>
      <TouchableOpacity onPress={pickImage} style={styles.container}>
        {image && <Image source={image} style={styles.img} />}
        {!image && <AntDesign name="plus" size={48} color="black" />}
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          {!showNatureImagePicker && !showColorImagePicker && (
            <DefalutImagePicker
              onSelect={(selectedImage) => {
                setImage(selectedImage);
                setModalVisible(false);
              }}
            />
          )}

          {showNatureImagePicker && !showColorImagePicker && (
            <NatureImagePicker
              onSelect={(selectedImage) => {
                setImage(selectedImage);
                setShowNatureImagePicker(false);
              }}
            />
          )}

          {!showNatureImagePicker && showColorImagePicker && (
            <ColorImagePicker
              onSelect={(selectedImage) => {
                setImage(selectedImage);
                setShowColorImagePicker(false);
              }}
            />
          )}

          <View style={styles.pictureContainer}>
            <View style={styles.pictureContainer1}>
              <Pressable
                onPress={pickImageFromGallery}
                style={[
                  styles.picture,
                  { backgroundColor: GlobalColors.colors.primary400 },
                ]}
              >
                <AntDesign name="picture" size={24} color="black" />
              </Pressable>
              <Text>사진</Text>
            </View>
            <View style={styles.pictureContainer1}>
              <Pressable
                onPress={() => setShowNatureImagePicker(true)}
                style={[
                  styles.picture,
                  { backgroundColor: GlobalColors.colors.gray400 },
                ]}
              >
                <MaterialCommunityIcons
                  name="weather-night"
                  size={24}
                  color="black"
                />
              </Pressable>
              <Text>자연</Text>
            </View>
            <View style={styles.pictureContainer1}>
              <Pressable
                onPress={() => setShowColorImagePicker(true)}
                style={[
                  styles.picture,
                  { backgroundColor: GlobalColors.colors.secondary500 },
                ]}
              >
                <Ionicons name="color-palette" size={24} color="black" />
              </Pressable>
              <Text>색상</Text>
            </View>
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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  picture: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: GlobalColors.colors.gray400,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  pictureContainer: {
    flexDirection: "row",
    position: "absolute",
    top: 150,
  },
  pictureContainer1: {
    alignItems: "center",
    padding: 10,
  },
});

export default AddFile;
