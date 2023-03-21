import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { GlobalColors } from "../../constants/color";

const ExitModal = ({ exitModalVisible, exitCloseModalPress }) => {
  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={exitModalVisible}
        onRequestClose={() => {
          Alert.alert("모달이 닫힙니다.");
          exitCloseModalPress();
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>정말 소모임에서 나가시겠어요?</Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[styles.button, styles.buttonExit]}
                onPress={exitCloseModalPress}
              >
                <Text style={styles.buttonText}>나가기</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={exitCloseModalPress}
              >
                <Text style={styles.buttonText}>취소</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExitModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalContainer: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  button: {
    borderRadius: 4,
    padding: 8,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonOpen: {
    backgroundColor: GlobalColors.colors.primary500,
  },

  buttonClose: {
    backgroundColor: GlobalColors.colors.primary500,
  },

  buttonExit: {
    backgroundColor: GlobalColors.colors.red500,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  buttonContainer: {
    width: 150,
    flexDirection: "row",
    justifyContent: "space-around",
  },

  buttonText: {
    color: GlobalColors.colors.white500,
  },
});
