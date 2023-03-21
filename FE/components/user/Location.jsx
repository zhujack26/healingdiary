import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { GlobalColors } from "../../constants/color";

const Location = ({ title }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const items = [
    { label: "서울", value: "1" },
    { label: "부산", value: "2" },
    { label: "대구", value: "3" },
    { label: "인천", value: "4" },
    { label: "경기도", value: "5" },
    { label: "충북", value: "6" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setSelectedValue(value)}
        items={items}
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
  }
});

export default Location;