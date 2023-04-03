import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
import { createGroup } from "../../api/group";
import * as ImagePicker from "expo-image-picker";
import GroupInfoUpdateHeader from "./GroupInfoUpdateHeader";
import GroupInfoUpdateIntro from "./GroupInfoUpdateIntro";

const extensionToMimeType = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
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
    formData.append("file", file);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("tags", selectedTags);

    const res = await createGroup(formData);
    console.log(res);
    if (res.status === 200)
      navigation.navigate("groupDetail", { groupId: res.data.clubId });
    else console.log("생성 실패");
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
