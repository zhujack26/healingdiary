import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>회원정보</Text>
      <Image style={styles.img} source={require('../../assets/images/SAMPLE1.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
   fontSize: 30
  },
  img:{
    width: 50,
    height: 50,
    borderRadius: 50
  }
});

export default Profile;
