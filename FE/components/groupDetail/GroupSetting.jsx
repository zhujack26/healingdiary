import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/color";

const { width } = Dimensions.get("window");
const GroupSetting = ({ handleCloseModalPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.settingTitle}>설정</Text>
      <Ionicons
        name="close"
        size={36}
        color={GlobalColors.colors.black500}
        onPress={handleCloseModalPress}
        style={styles.closeIcon}
      />
      <View style={[styles.settingList, styles.settingListFirst]}>
        <Text style={styles.settingListText}>소모임 정보</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={GlobalColors.colors.gray600}
        />
      </View>
      <View style={styles.settingList}>
        <Text style={styles.settingListText}>소모임 멤버</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={GlobalColors.colors.gray600}
        />
      </View>
      <View style={styles.settingList}>
        <Text style={styles.settingListText}>멤버 승인</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={GlobalColors.colors.gray600}
        />
      </View>
      <View style={styles.settingList}>
        <Text style={styles.settingListText}>소모임 나가기</Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={GlobalColors.colors.gray600}
        />
      </View>
    </View>
  );
};

export default GroupSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: width,
  },

  settingTitle: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 24,
    marginBottom: 32,
  },

  closeIcon: {
    position: "absolute",
    top: -3,
    right: 15,
  },

  settingListFirst: {
    borderTopWidth: 0.5,
  },

  settingList: {
    borderBottomWidth: 0.5,
    borderColor: GlobalColors.colors.gray600,
    width: width,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  settingListText: {
    fontFamily: "KoddiUDOnGothic-Regular",
    fontSize: 16,
  },
});
