import { View, StyleSheet, Dimensions } from "react-native";
import SearchBox from "../components/invite/SearchBox";
import InviteDetail from "../components/invite/InviteDetail";

const deviceHeight = Dimensions.get("window").height - 130;
const InviteScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBox />
      <InviteDetail />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    height: deviceHeight,
  },
});
export default InviteScreen;
