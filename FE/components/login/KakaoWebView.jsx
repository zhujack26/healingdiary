import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";

const REST_API_KEY = "ea24aef24b022accc550da42d6c80097";
const REDIRECT_URI = "http://j8b203.p.ssafy.io:8080";
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage("message from webView");`;

const KakaoWebView = () => {
  const requestToken = async (code) => {
    const requestTokenUrl = "https://kauth.kakao.com/oauth/token";

    axios({
      method: "post",
      url: requestTokenUrl,
      params: {
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code: code,
      },
    })
      .then((response) => {
        const {
          access_token,
          expires_in,
          refresh_token,
          refresh_token_expires_in,
          token_type,
          id_token,
          scope,
        } = response.data;
      })
      .catch((error) => console.log("error", error));
  };

  const getCode = (target) => {
    const exp = "code=";
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      console.log("access code", requestCode);
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
          console.log("data", data);
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
