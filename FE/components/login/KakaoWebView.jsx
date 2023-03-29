import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { getToken, kakaoLogin } from "../../api/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
const REST_API_KEY = "ea24aef24b022accc550da42d6c80097";
const REDIRECT_URI = "http://j8b203.p.ssafy.io:8080";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("message from webView");`;

const KakaoWebView = () => {
  const requestToken = async (code) => {
    try {
      // 카카오에 access_token 받아오기
      const response = await getToken(code);
      // localStorage에 저장하기
      await AsyncStorage.setItem("accessToken", response.data.access_token);
      // access_token을 가지고 backend 서버에 유저 정보 요청하기
      const res = await kakaoLogin();
      console.log(res);
    } catch (e) {
      console.log("e", e);
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
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
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
