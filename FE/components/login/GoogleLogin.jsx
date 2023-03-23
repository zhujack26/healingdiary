import {
  Pressable,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";

const deviceWidth = Dimensions.get("window").width - 50;
WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "190243783703-jlr28ac2klqm838gpuqqnpmhmhfrm410.apps.googleusercontent.com",
    iosClientId:
      "190243783703-cgdj807fu3obb5npckkh3jaoh5p1bhk5.apps.googlusercontent.com",
    expoClientId:
      "190243783703-g3f8iuq3uobr7c2svh8varbsdrpdm8jr.apps.googleusercontent.com",
  });

  const loginWithGoogle = () => {
    promptAsync({ useProxy: true, showInRecents: true });
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { accessToken, expiresIn, scope, tokenType } =
        response.authentication;
      getUserData();
    }
  }, [response]);

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    userInfoResponse.json().then((data) => {
      setUserInfo(data);
    });
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
