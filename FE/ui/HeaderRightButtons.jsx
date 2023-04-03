import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderRightButtons = ({ navigation }) => {
  const [userImage, setUserImage] = useState(null);
  const getUserImage = useCallback(async () => {
    const data = await AsyncStorage.getItem("userImage");
    setUserImage(data);
  }, []);

  const getNotice = useCallback(async () => {
    const res = await getNotification();
    console.log(res);
  });

  useEffect(() => {
    getUserImage();
    getNotice();
  }, [getUserImage, getNotice]);

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        <MaterialCommunityIcons
          name="bell"
          size={24}
          color="black"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("ModifyingInform")}>
        <View>
          <Image style={styles.img} source={userImage && { uri: userImage }} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 25,
    height: 25,
    borderRadius: 50,
    marginRight: 30,
  },
});

export default React.memo(HeaderRightButtons);
