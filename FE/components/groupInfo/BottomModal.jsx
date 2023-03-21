import { useCallback, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import { Button } from "react-native";
import GroupInfoImageUpdateButton from "./GroupInfoImageUpdateButton";
const BottomModal = ({ bottomSheetModalRef }) => {
  const snapPoints = useMemo(() => [150], []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="close"
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enabledPanDownToClose={true}
      >
        <GroupInfoImageUpdateButton
          handleCloseModalPress={handleCloseModalPress}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomModal;
