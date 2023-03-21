import {
  Pressable,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";

const deviceWidth = Dimensions.get("window").width - 50;

const GoogleLogin = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "190243783703-cll6fnkujk0c0h29b4l1fs0bgf27rm4d.apps.googleusercontent.com",
  });

  const loginWithGoogle = () => {
    promptAsync();
  };

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
    }
  }, [response, token]);

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
    marginBottom: 18,
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
    fontSize: 18,
    color: "#949292",
    textAlign: "center",
  },
});
