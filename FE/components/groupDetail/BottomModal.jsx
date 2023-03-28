import { useCallback, useMemo } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";

import GroupSetting from "./GroupSetting";
const BottomModal = ({
  bottomSheetModalRef,
  handleCloseModalPress,
  openExitModalAndCloseModal,
}) => {
  const snapPoints = useMemo(() => ["70%"], []);
  const navigation = useNavigation();

  const navigateAndCloseModal = (name, isEdit) => {
    const params = { isEdit };
    navigation.navigate(name, params);
    handleCloseModalPress();
  };

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
        <GroupSetting
          handleCloseModalPress={handleCloseModalPress}
          openExitModalAndCloseModal={openExitModalAndCloseModal}
          navigateAndCloseModal={navigateAndCloseModal}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

export default BottomModal;
