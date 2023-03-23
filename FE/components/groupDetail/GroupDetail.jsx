import { View, StyleSheet } from "react-native";
import { useCallback, useRef, useState } from "react";

import GroupDiaryList from "./GroupDiaryList";
import GroupDetailHeader from "./GroupDetailHeader";
import BottomModal from "./BottomModal";
import { GlobalColors } from "../../constants/color";

const GroupDetail = () => {
  const bottomSheetModalRef = useRef(null);
  const [exitModalVisible, setExitModalVisible] = useState(false);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const exitCloseModalPress = () => {
    setExitModalVisible(false);
  };

  const openExitModalAndCloseModal = () => {
    setExitModalVisible(true);
    handleCloseModalPress();
  };

  return (
    <View style={[exitModalVisible && styles.blur, styles.container]}>
      <GroupDetailHeader handlePresentModalPress={handlePresentModalPress} />
      <GroupDiaryList
        exitModalVisible={exitModalVisible}
        exitCloseModalPress={exitCloseModalPress}
      />
      <BottomModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleCloseModalPress={handleCloseModalPress}
        openExitModalAndCloseModal={openExitModalAndCloseModal}
      />
    </View>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  blur: {
    flex: 1,
    backgroundColor: GlobalColors.colors.gray500,
    opacity: 0.6,
  },
});
