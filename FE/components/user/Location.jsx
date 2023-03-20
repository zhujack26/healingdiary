import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View } from 'react-native';
import { GlobalColors } from "../../constants/color";

const Location = ({ title }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '서울', value: '1' },
    { label: '부산', value: '2' },
    { label: '대구', value: '3' },
    { label: '인천', value: '4' },
  ]);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
        <DropDownPicker 
        style={styles.input}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="선택하세요"
        placeholderStyle={{
          color: "white"
        }}
      />
    </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      zIndex: 999
    },
    title:{
      marginBottom: 4,
      fontSize: 20,
    },
    input:{
      borderWidth: 0,
      borderBottomWidth: 1,
      borderBottomColor: GlobalColors.colors.white500,
      backgroundColor: GlobalColors.colors.primary500,
      borderRadius: 0
    }
  });

  export default Location;
  
  