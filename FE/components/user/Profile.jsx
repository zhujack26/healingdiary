import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Profile = ({ image, pickImage }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>회원정보</Text>
      <Pressable onPress={pickImage} style={styles.Imagecontainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.img} />
        ) : (
          <Ionicons name="add" size={36} color="black" />
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    fontSize: 30,
  },

  Imagecontainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: 70,
    height: 70,
    borderWidth: 1,
    borderRadius: 50,
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});

export default Profile;
