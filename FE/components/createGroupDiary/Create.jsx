import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { useState, useEffect } from "react";
import GroupNextButton from "./GroupNextButton";
import Record from "./Record";
import AddImage from "./AddImage";

const Create = ({ navigation, route }) => {
  const { groupId } = route.params;
  const [response, setResponse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <GroupNextButton
          {...props}
          navigation={navigation}
          response={response}
          selectedImage={selectedImage}
          groupId={groupId}
        />
      ),
    });
  }, [navigation, selectedImage, response]);

  return (
    <View style={styles.container}>
      <View style={styles.inform}>
        <AddImage onSelectedImage={handleSelectedImage} />
        <Record onResponse={setResponse} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalColors.colors.primary500,
  },
  inform: {
    alignItems: "center",
    top: 100,
    width: "100%",
    height: "90%",
    backgroundColor: GlobalColors.colors.white500,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default Create;
