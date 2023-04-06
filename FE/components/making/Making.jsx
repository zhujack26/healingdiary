import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import AddFile from "./AddFile";
import { useState, useEffect } from "react";
import NextButton from "./NextButton";
import TimerRecord from "./TimerRecord";

const Making = ({ navigation }) => {
  const [response, setResponse] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: (props) => (
        <NextButton
          {...props}
          navigation={navigation}
          response={response}
          selectedImage={selectedImage}
        />
      ),
    });
  }, [navigation, selectedImage, response]);

  return (
    <View style={styles.container}>
      <View style={styles.inform}>
        <AddFile onSelectedImage={handleSelectedImage} />
        <TimerRecord onResponse={setResponse} />
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

export default Making;
