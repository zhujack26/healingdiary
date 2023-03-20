import { View, Text, StyleSheet } from "react-native";
import AddFile from "./AddFile";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>회원정보</Text>
      <AddFile/>
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
});

export default Profile;
