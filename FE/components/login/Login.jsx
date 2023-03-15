import { View, StyleSheet, StatusBar } from "react-native";
import Logo from "./Logo";

const Login = () => {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Logo />
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
