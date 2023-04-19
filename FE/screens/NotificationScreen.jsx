import { View, StyleSheet } from "react-native";
import Detail from "../components/notification/Detail";

const NotificationScreen = ({ route }) => {
  const { notice } = route.params;
  return (
    <View>
      <Detail notice={notice} />
    </View>
  );
};

const styles = StyleSheet.create({});
export default NotificationScreen;
