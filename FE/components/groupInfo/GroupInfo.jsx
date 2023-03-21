import { View, StyleSheet } from "react-native";
import { useRef, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import GroupInfoHeader from "./GroupInfoHeader";
import BottomModal from "./BottomModal";
import GroupIntroduction from "./GroupIntroduction";

const GroupInfo = () => {
  const navigation = useNavigation();
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  });
  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  return (
    <>
      <GroupInfoHeader
        navigation={navigation}
        handlePresentModalPress={handlePresentModalPress}
        handleCloseModalPress={handleCloseModalPress}
      />
      <View style={styles.container}>
        <GroupIntroduction />
      </View>
      <BottomModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleCloseModalPress={handleCloseModalPress}
        navigation={navigation}
      />
    </>
  );
};

export default GroupInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});
