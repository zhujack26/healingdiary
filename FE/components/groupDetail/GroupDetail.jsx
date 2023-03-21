import { ScrollView, StyleSheet } from "react-native";
import { useCallback, useRef, useState } from "react";

import GroupDiaryList from "./GroupDiaryList";
import GroupIntroduction from "./GroupIntroduction";
import GroupDetailHeader from "./GroupDetailHeader";
import BottomModal from "./BottomModal";
import ExitModal from "./ExitModal";

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
    <>
      <GroupDetailHeader handlePresentModalPress={handlePresentModalPress} />
      <ScrollView style={styles.container}>
        <GroupIntroduction />
        <GroupDiaryList />
        {exitModalVisible && (
          <ExitModal
            exitModalVisible={exitModalVisible}
            exitCloseModalPress={exitCloseModalPress}
          />
        )}
      </ScrollView>
      <BottomModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleCloseModalPress={handleCloseModalPress}
        openExitModalAndCloseModal={openExitModalAndCloseModal}
      />
    </>
  );
};

export default GroupDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
});
