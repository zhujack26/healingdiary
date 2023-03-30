import { View, Text, StyleSheet } from "react-native";
import { GlobalColors } from "../../constants/color";
import RNPickerSelect from "react-native-picker-select";

const items = [
  { id: 1, label: "서울", value: "서울" },
  { id: 2, label: "부산", value: "부산" },
  { id: 3, label: "대구", value: "대구" },
  { id: 4, label: "대전", value: "대전" },
  { id: 5, label: "광주", value: "광주" },
  { id: 6, label: "울신", value: "울산" },
  { id: 7, label: "경기도", value: "경기도" },
  { id: 8, label: "강원도", value: "강원도" },
  { id: 9, label: "충청도", value: "충청도" },
  { id: 10, label: "전라도", value: "전라도" },
  { id: 11, label: "경상도", value: "경상도" },
  { id: 12, label: "제주도", value: "제주도" },
];

const Location = ({ title, onChangeLocation, selectedLocation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={onChangeLocation}
        items={items}
        value={selectedLocation}
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

export default Location;
