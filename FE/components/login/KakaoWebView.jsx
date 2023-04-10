import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { getToken, kakaoLogin } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_END_POINT, REST_API_KEY } from "../../constants/index";
import { useNavigation } from "@react-navigation/native";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("message from webView");`;

const KakaoWebView = () => {
  const navigation = useNavigation();

  const requestToken = async (code) => {
    try {
      const response = await getToken(code);
      const res = await kakaoLogin(response.access_token);
      if (res.message === "사용자를 찾을 수 없습니다.") {
        navigation.navigate("userinform", {
          provider: "KAKAO",
          accessToken: response.access_token,
        });
      } else {
        // AsyncStorage에 저장하기
        const { jwt_token, nickname, region, member_image_url, disease } = res;
        console.log(jwt_token);
        const id = res.id.toString();
        if (jwt_token && nickname && region && member_image_url) {
          await AsyncStorage.setItem("id", id);
          await AsyncStorage.setItem("jwtToken", jwt_token);
          await AsyncStorage.setItem("nickname", nickname);
          await AsyncStorage.setItem("region", region);
          await AsyncStorage.setItem("disease", disease);
          await AsyncStorage.setItem("userImage", member_image_url);
          navigation.navigate("diaryBottomTab");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCode = (target) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      requestToken(requestCode);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        style={styles.webView}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${API_END_POINT}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        onMessage={(event) => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
};

export default KakaoWebView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  webView: {
    flex: 1,
  },
});
