import { useCallback, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import GroupInfoUpdateButton from "./GroupInfoUpdateButton";

const BottomModal = ({
  bottomSheetModalRef,
  handleCloseModalPress,
  navigation,
}) => {
  const snapPoints = useMemo(() => [150], []);

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
        <GroupInfoUpdateButton
          handleCloseModalPress={handleCloseModalPress}
          navigation={navigation}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomModal;
