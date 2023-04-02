import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import GroupInfoUpdateHeader from "./GroupInfoUpdateHeader";
import GroupInfoUpdateIntro from "./GroupInfoUpdateIntro";
import axiosInstance from "../../api/interceptor";
import { postFormConfig } from "../../api/config";
import axios from "axios";
import { API_END_POINT } from "../../constants";
import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
const extensionToMimeType = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  // add more mappings as needed
};

const GroupInfoUpdate = ({ isEdit }) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputText, setInputText] = useState("");

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
    if (!result.canceled && result.assets && result.assets[0]) {
      setImage({ uri: result.assets[0].uri });
    }
    setModalVisible(false);
  };

  const handleInputTextChange = (text) => {
    setInputText(text);
  };

  const handleNameTextChange = (text) => {
    setName((prevName) => text);
  };

  const handleDescriptionTextChange = (text) => {
    setDescription((prevDescrition) => text);
  };

  const isTagAlreadySelected = (tag) => {
    return selectedTags.some(
      (selectedTag) => selectedTag.keyword === tag.keyword
    );
  };

  const handleInputSubmit = () => {
    if (inputText.trim() !== "" && selectedTags.length < 3) {
      const newTag = {
        id: `custom-${Date.now()}`,
        keyword: `${inputText.trim()}`,
      };
      if (!isTagAlreadySelected(newTag)) {
        setSelectedTags([...selectedTags, newTag.keyword]);
        setInputText("");
      }
    }
  };
  const registGroup = async () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `${API_END_POINT}/clubs`);
    xhr.setRequestHeader("Content-type", "multipart/form-data");
    xhr.setRequestHeader(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMDIiLCJyb2xlcyI6WyJVU0VSIl0sImlhdCI6MTY4MDQwMjI0NiwiZXhwIjoxNjgwNDA0MDQ2fQ.pBwmXIJIUkT59pF3tiP5No_fLDyDXIZAhEqsXfItnQg"
    );
    try {
      const extension = image.uri.split(".").pop();
      const fileName = image.uri.split("/").pop();
      const mimeType = extensionToMimeType[extension];
      const file = {
        uri:
          Platform.OS === "android"
            ? image.uri
            : image.uri.replace("file://", ""),
        type: mimeType,
        name: fileName,
      };
      const formData = new FormData();
      const clubRegister = {
        name: name,
        description: description,
        tags: selectedTags,
      };

      formData.append("file", file);
      formData.append("ClubRegister", clubRegister);
      // formData.append("ClubRegister", JSON.stringify(clubRegister));
      const res = await axiosInstance(postFormConfig("/clubs", formData));
      console.log(res);
      // Show success message to the user
    } catch (error) {
      if (error.response) {
        // The server returned an error response
        const errorMessage = error.response.data.message;
        console.log("error", errorMessage);
        // Show error message to the user
      } else if (error.request) {
        console.log("error.request", error.request);
        // The request was made but no response rwas received, or the network error occurred
        // Show network error message to the user
      } else {
        // Something else happened, e.g. the request was cancelled
        console.log("error.message", error.message);
      }
    }
  };
  return (
    <>
      <GroupInfoUpdateHeader
        isEdit={isEdit}
        navigation={navigation}
        image={image}
        setImage={setImage}
        pickImage={pickImage}
        pickImageFromGallery={pickImageFromGallery}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        registGroup={registGroup}
      />
      <GroupInfoUpdateIntro
        isEdit={isEdit}
        inputText={inputText}
        selectedTags={selectedTags}
        handleInputTextChange={handleInputTextChange}
        handleInputSubmit={handleInputSubmit}
        handleNameTextChange={handleNameTextChange}
        handleDescriptionTextChange={handleDescriptionTextChange}
      />
    </>
  );
};

export default GroupInfoUpdate;
