import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { GlobalColors } from "../../constants/color";
import {
  rejectAndExitMember,
  deleteGroup,
  getGroupDetail,
  joinGroup,
  getGroupMemebrList,
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
  const [groupMember, setGroupMember] = useState([]);
  const [diaries, setDiaries] = useState([]);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [memberId, setMemberId] = useState("");
  const bottomSheetModalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  let isMember = groupMember.some(
    (member) => member.memberId?.toString() === memberId
  );

  const callGetGroupMember = useCallback(async () => {
    const res = await getGroupMemebrList(groupId);
    setGroupMember(res.content);
  });

  const getGroupDetails = useCallback(async () => {
    const res = await getGroupDetail(groupId);
    setGroupData(res);
  }, [groupId]);

  const getGroupDiaries = useCallback(async () => {
    const res = await getGroupDiary(groupId);
    setDiaries(res);
  }, [groupId]);

  const getMemberId = useCallback(async () => {
    const id = await AsyncStorage.getItem("id");
    setMemberId(id);
  }, []);

  const callExitMember = useCallback(async (clubId, memberId) => {
    const res = await rejectAndExitMember({ clubId, memberId });
    return res;
  }, []);

  const signupGroup = useCallback(async () => {
    const res = await joinGroup(groupId);
    return res;
  }, [groupId]);

  const callDeleteGroup = useCallback(async () => {
    const res = await deleteGroup(groupId);
    if (res.status === 200) navigation.navigate("Home");
  }, [groupId, navigation]);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const exitCloseModalPress = useCallback(() => {
    setExitModalVisible(false);
  }, []);

  const openExitModalAndCloseModal = useCallback(() => {
    setExitModalVisible(true);
    handleCloseModalPress();
  }, [handleCloseModalPress]);

  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        getGroupDetails(),
        getGroupDiaries(),
        callGetGroupMember(),
      ]);
      getMemberId();
    }
    fetchData();
    setIsLoading(false);
  }, [groupId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={GlobalColors.colors.primary400}
        />
      </View>
    );
  }

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
        callExitMember={callExitMember}
        callDeleteGroup={callDeleteGroup}
        signupGroup={signupGroup}
        isMember={isMember}
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
