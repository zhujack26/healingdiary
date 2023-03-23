import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, Text, View } from "react-native";
import { GlobalColors } from "../../constants/color";

const Disease = ({ title }) => {
  const [selectedValue, setSelectedValue] = useState(null);

  const items = [
    { label: "위암", value: "1" },
    { label: "심장질환", value: "2" },
    { label: "뇌질환", value: "3" },
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
  }
});

export default Disease;
