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
      // 카카오에 access_token 받아오기
      const response = await getToken(code);
      // access_token을 가지고 backend 서버에 유저 정보 요청하기
      const res = await kakaoLogin(response.access_token);
      console.log(res);
      if (res.message === "사용자를 찾을 수 없습니다.") {
        navigation.navigate("userinform");
      } else {
        // AsyncStorage에 저장하기
        await AsyncStorage.setItem("jwtToken", res.jwtToken);
        navigation.navigate("diaryBottomTab");
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
