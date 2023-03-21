import { View, Text } from "react-native";
import { useRef, useCallback } from "react";

import GroupInfoHeader from "./GroupInfoHeader";
import BottomModal from "./BottomModal";
const GroupInfo = () => {
  const bottomSheetModalRef = useRef(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  });
  return (
    <>
      <GroupInfoHeader handlePresentModalPress={handlePresentModalPress} />
      <BottomModal bottomSheetModalRef={bottomSheetModalRef} />
    </>
  );
};

export default GroupInfo;
