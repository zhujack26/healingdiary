import { View, StyleSheet } from "react-native";
import GoogleLogin from "./GoogleLogin";
import KaKaoLogin from "./KaKaoLogin";

const Login = () => {
  return (
    <View style={styles.container}>
      <View></View>
      <KaKaoLogin />
      <GoogleLogin />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
