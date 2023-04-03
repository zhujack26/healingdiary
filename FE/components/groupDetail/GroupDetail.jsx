import { View, StyleSheet } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalColors } from "../../constants/color";
import { getGroupDetail } from "../../api/group";

import GroupDiaryList from "./GroupDiaryList";
import GroupDetailHeader from "./GroupDetailHeader";
import BottomModal from "./BottomModal";

const GroupDetail = ({ groupId }) => {
  const [groupData, setGroupData] = useState({});
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);

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

  const getGroupDetails = async () => {
    const res = await getGroupDetail(groupId);
    setGroupData(res);
  };

  useEffect(() => {
    getGroupDetails();
  }, [groupId]);

  return (
    <View style={[exitModalVisible && styles.blur, styles.container]}>
      <GroupDetailHeader
        handlePresentModalPress={handlePresentModalPress}
        image={groupData.clubImageUrl}
      />
      <GroupDiaryList
        exitModalVisible={exitModalVisible}
        exitCloseModalPress={exitCloseModalPress}
        groupData={groupData}
      />
      <BottomModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleCloseModalPress={handleCloseModalPress}
        openExitModalAndCloseModal={openExitModalAndCloseModal}
        groupId={groupId}
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
