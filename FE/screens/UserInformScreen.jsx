import { Dimensions, View, Text, StyleSheet } from "react-native";
import Location from "../components/user/Location";
import Nickname from "../components/user/Nickname"
import Disease from "../components/user/Disease"
import Profile from "../components/user/Profile"
import { GlobalColors } from "../constants/color";
import Button from "../ui/Button"

const deviceWidth = Dimensions.get("window").width - 50;
const UserInformScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Profile/>
      </View>
      <View style={styles.inform}>
        <Nickname title={'별명'} placeholder={'별명을 입력하세요'}/>
        <Location title={'지역'}/>
        <Disease title={'병명'}/>
      </View>
      <View style={styles.button}>
        <Button>
          저장
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: deviceWidth+50,
  },
  profile: {
    top: 100,
    height:"10%"
  },
  inform: {
    height:"78%",
    top: 190,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    // paddingBottom: 200,
    backgroundColor: GlobalColors.colors.primary500
  },
  button: {
    alignItems: 'center',
    top: 50
  }
});


export default UserInformScreen;
