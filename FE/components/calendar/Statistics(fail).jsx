import * as React from "react";
import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import { WebView } from "react-native-webview";
import { wordcloudHTML } from "./wordcloud";

const Statistics = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ html: wordcloudHTML }}
        style={styles.webview}
        originWhitelist={["*"]}
        javaScriptEnabled
        scalesPageToFit
        onLoad={() => console.log("WebView loaded")}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    shadowOpacity: 0.1,
    elevation: 4,
    marginTop: 20,
    padding: 10,
    backgroundColor: GlobalColors.colors.white500,
    height: "100%",
    width: "100%"
  },
  webview: {
    width: "100%",
    height: 250,
  },
});

export default Statistics;
