import { View, StyleSheet, Dimensions } from "react-native";
import SearchBox from "../components/invite/SearchBox";
import InviteDetail from "../components/invite/InviteDetail";

const InviteScreen = ({ route }) => {
  const { groupId } = route.params;
  return (
    <View style={styles.container}>
      <SearchBox />
      <InviteDetail groupId={groupId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default InviteScreen;
