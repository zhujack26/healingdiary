import { View, StyleSheet } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalColors } from "../../constants/color";
import {
  exitGroup,
  deleteGroup,
  getGroupDetail,
  joinGroup,
  callGroupApplyList,
} from "../../api/group";
import { useNavigation } from "@react-navigation/native";
import { getGroupDiary } from "../../api/diary";

import GroupDiaryList from "./GroupDiaryList";
import GroupDetailHeader from "./GroupDetailHeader";
import BottomModal from "./BottomModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GroupDetail = ({ groupId }) => {
  const navigation = useNavigation();
  const [groupData, setGroupData] = useState({});
  const [diaries, setDiaries] = useState([]);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [memberId, setMemberId] = useState("");

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

  const getGroupDiaries = async () => {
    const res = await getGroupDiary(groupId);
    setDiaries(res);
  };

  const leaveGroup = async () => {
    const res = await exitGroup(groupId, memberId);
    return res;
  };

  const signupGroup = async () => {
    const res = await joinGroup(groupId);
    return res;
  };

  const handleDeleteGroup = async () => {
    const res = await deleteGroup(groupId);
    if (res.status === 200) navigation.navigate("Home");
  };

  const getMemberId = async () => {
    const id = await AsyncStorage.getItem("id");
    setMemberId(id);
  };

  useEffect(() => {
    getGroupDetails();
    getGroupDiaries();
  }, [groupId]);

  useEffect(() => {
    getMemberId();
  }, []);

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
        groupId={groupId}
        diaries={diaries}
        memberId={memberId}
        leaveGroup={leaveGroup}
        handleDeleteGroup={handleDeleteGroup}
        signupGroup={signupGroup}
      />
      <BottomModal
        bottomSheetModalRef={bottomSheetModalRef}
        handleCloseModalPress={handleCloseModalPress}
        openExitModalAndCloseModal={openExitModalAndCloseModal}
        groupId={groupId}
        host={groupData.host}
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
