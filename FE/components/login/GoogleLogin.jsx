import {
  Pressable,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const deviceWidth = Dimensions.get("window").width - 50;

const GoogleLogin = () => {
  const loginWithGoogle = () => {
    console.log("google login");
  };
  return (
    <Pressable style={styles.google} onPress={loginWithGoogle}>
      <Image
        style={styles.image}
        source={require("../../assets/images/google_logo.png")}
      />
      <View style={styles.googleLogin}>
        <Text style={styles.loginText}>구글 계정으로 로그인</Text>
      </View>
    </Pressable>
  );
};

export default GoogleLogin;

const styles = StyleSheet.create({
  google: {
    flexDirection: "row",
    width: deviceWidth,
    height: 60,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 12,
  },
  image: {
    width: 35,
    height: 35,
  },
  googleLogin: {
    width: deviceWidth - 60,
    justifyContent: "center",
    alignContent: "center",
  },
  loginText: {
    fontFamily: "Roboto",
    fontSize: 18,
    color: "#949292",
    textAlign: "center",
  },
});
