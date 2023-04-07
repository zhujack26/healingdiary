import { StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/color";
import RNPickerSelect from "react-native-picker-select";

const items = [
  { id: 1, label: "암", value: "암" },
  { id: 2, label: "심장질환", value: "심장질환" },
  { id: 3, label: "뇌질환", value: "뇌질환" },
  { id: 3, label: "폐질환", value: "폐질환" },
  { id: 3, label: "간질환", value: "간질환" },
  { id: 3, label: "당뇨병", value: "당뇨병" },
  { id: 3, label: "인플루엔자", value: "인플루엔자" },
];

const Disease = ({ title, onChangeDisease, selectedDisease }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={onChangeDisease}
        items={items}
        value={selectedDisease}
        placeholder={{
          label: "선택하세요",
          value: null,
          color: pickerSelectStyles.placeholder.color,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    marginBottom: 4,
    fontSize: 20,
  },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.colors.white500,
    backgroundColor: GlobalColors.colors.primary500,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.colors.white500,
    backgroundColor: GlobalColors.colors.primary500,
  },
  placeholder: {
    color: GlobalColors.colors.black500,
  },
  viewContainer: {
    borderBottomWidth: 1,
    borderBottomColor: GlobalColors.colors.white500,
  },
});

export default Disease;
