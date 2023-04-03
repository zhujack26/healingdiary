import React, { useEffect, useState, useCallback } from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getNotification } from "../api/notification";
import { GlobalColors } from "../constants/color";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HeaderRightButtons = ({ navigation }) => {
  const [userImage, setUserImage] = useState(null);
  const [notice, setNotice] = useState([]);

  const getUserImage = useCallback(async () => {
    const data = await AsyncStorage.getItem("userImage");
    setUserImage(data);
  }, []);

  const getNotice = useCallback(async () => {
    const res = await getNotification();
    setNotice(res ? res : []);
  }, []);

  useEffect(() => {
    getUserImage();
    getNotice();
  }, [getUserImage, getNotice]);

  return (
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
        {notice.length > 0 && <View style={styles.circle}></View>}
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

  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: GlobalColors.colors.red500,
    position: "absolute",
    top: -3,
    right: 5,
  },
});

export default React.memo(HeaderRightButtons);
