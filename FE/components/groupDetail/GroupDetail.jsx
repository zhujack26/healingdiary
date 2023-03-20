import { ScrollView, StyleSheet } from "react-native";
import { useCallback, useRef } from "react";

import GroupDiaryList from "./GroupDiaryList";
import GroupIntroduction from "./GroupIntroduction";
import GroupDetailHeader from "./GroupDetailHeader";
import BottomModal from "./BottomModal";

const GroupDetail = () => {
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <GroupDetailHeader handlePresentModalPress={handlePresentModalPress} />
      <ScrollView style={styles.container}>
        <GroupIntroduction />
        <GroupDiaryList />
      </ScrollView>
      <BottomModal bottomSheetModalRef={bottomSheetModalRef} />
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
