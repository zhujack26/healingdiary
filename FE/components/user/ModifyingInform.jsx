import {
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  Pressable,
} from "react-native";
import React, { useReducer, useEffect, useCallback } from "react";
import { GlobalColors } from "../../constants/color";
import { duplicationNickname } from "../../api/user";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import Profile from "./Profile";
import Nickname from "./Nickname";
import Location from "./Location";
import Disease from "./Disease";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfirmButton from "./../../ui/ConfirmButton";
import { userInfoUpdate } from "./../../api/user";

const { width, height } = Dimensions.get("window");
const regex = /^[a-zA-Z0-9가-힣]{2,8}$/;
const specialChars = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

const initialState = {
  nickname: "",
  message: "",
  image: null,
  selectedLocation: "",
  selectedDisease: "",
  isValud: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NICKNAME":
      return { ...state, nickname: action.payload.nickname };
    case "SET_MESSAGE":
      return { ...state, message: action.payload.message };
    case "SET_IMAGE":
      return { ...state, image: action.payload.image };
    case "SET_SELECTED_LOCATION":
      return { ...state, selectedLocation: action.payload.selectedLocation };
    case "SET_SELECTED_DISEASE":
      return { ...state, selectedDisease: action.payload.selectedDisease };
    case "SET_ALL":
      return {
        ...state,
        image: action.payload.image,
        nickname: action.payload.nickname,
        selectedLocation: action.payload.selectedLocation,
        selectedDisease: action.payload.selectedDisease,
      };
    default:
      return state;
  }
};

const ModifyingInform = () => {
  console.log("렌더링");
  const navigation = useNavigation();
  const [
    { nickname, message, image, selectedLocation, selectedDisease },
    dispatch,
  ] = useReducer(reducer, initialState);
  const isValid =
    selectedLocation && selectedDisease && message === "사용 가능합니다";

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });
    if (!result.canceled) {
      dispatch({ type: "SET_IMAGE", payload: { image: result.assets[0].uri } });
    }
  }, []);

  const onChangeNickname = useCallback((text) => {
    dispatch({ type: "SET_NICKNAME", payload: { nickname: text } });
  }, []);

  const onChangeLocation = useCallback((value) => {
    dispatch({
      type: "SET_SELECTED_LOCATION",
      payload: { selectedLocation: value },
    });
  }, []);

  const onChangeDisease = useCallback((value) => {
    dispatch({
      type: "SET_SELECTED_DISEASE",
      payload: { selectedDisease: value },
    });
  }, []);

  const isValidNickName = useCallback(
    async (nickname) => {
      const duplication = await duplicationNickname({ nickname });
      if (duplication) {
        dispatch({
          type: "SET_MESSAGE",
          payload: { message: "중복입니다" },
        });
        return;
      }
      // 닉네임이 2글자 이상 8글자 이하가 아님
      if (!regex.test(nickname) || specialChars.test(nickname)) {
        dispatch({
          type: "SET_MESSAGE",
          payload: { message: "유효한 닉네임이 아닙니다." },
        });

        return;
      }
      dispatch({
        type: "SET_MESSAGE",
        payload: { message: "사용 가능합니다" },
      });
    },
    [regex, specialChars]
  );

  // 회원정보 수정
  const updateUserInfo = async () => {
    const filename = image.split("/").pop();
    const match = /\.(\w+)$/.exec(filename ?? "");
    const type = match ? `image/${match[1]}` : `image`;

    const data = new FormData();
    data.append("image_file", {
      uri: image,
      name: filename,
      type,
    });
    console.log("image", image);
    const update = {
      nickname: nickname,
      disease: selectedDisease,
      region: selectedLocation,
      image_url: await AsyncStorage.getItem("userImage"),
    };

    console.log({ update, data });
    const res = await userInfoUpdate({ update, data });
    console.log("res", res);
    // 회원수정 성공하면 데이터가 넘어오니 다시 storage에 저장한다.
    // if (res.status === 200) {
    //   await AsyncStorage.setItem("userImage", res.data.member_image_url);
    //   await AsyncStorage.setItem("nickname", res.data.nickname);
    //   await AsyncStorage.setItem("region", res.data.region);
    //   await AsyncStorage.setItem("disease", res.data.disease);
    //   navigation.navigate("diaryBottomTab");
    // } else {
    //   console.log("에러처리 해야함");
    //   //
    // }
  };

  const getUserInfo = useCallback(async () => {
    try {
      const [image, nickname, region, disease] = await AsyncStorage.multiGet([
        "userImage",
        "nickname",
        "region",
        "disease",
      ]);

      console.log("렌더링", image, nickname, region, disease);
      dispatch({
        type: "SET_ALL",
        payload: {
          image: image[1],
          nickname: nickname[1],
          selectedLocation: region[1],
          selectedDisease: disease[1],
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    isValidNickName(nickname);
  }, [nickname]);

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
      android_ripple={false}
    >
      <View style={styles.container}>
        <Pressable
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={32}
            color={GlobalColors.colors.black500}
          />
        </Pressable>
        <View style={styles.profile}>
          <Profile pickImage={pickImage} image={image} />
        </View>
        <View style={styles.inform}>
          <Nickname
            title={"별명"}
            placeholder={"별명을 입력하세요"}
            message={message}
            nickname={nickname}
            onChangeNickname={onChangeNickname}
          />
          <Location
            title={"지역"}
            selectedLocation={selectedLocation}
            onChangeLocation={onChangeLocation}
          />
          <Disease
            title={"병명"}
            selectedDisease={selectedDisease}
            onChangeDisease={onChangeDisease}
          />
        </View>
        <View style={styles.button}>
          <ConfirmButton onPress={updateUserInfo} disabled={!isValid}>
            저장
          </ConfirmButton>
        </View>
      </View>
    </Pressable>
  );
};

export default ModifyingInform;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  profile: {
    flex: 1,
  },

  inform: {
    flex: 1.5,
    width: width,
    height: height,
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: GlobalColors.colors.primary500,
  },

  button: {
    position: "absolute",
    top: 5,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    position: "absolute",
    top: 0,
    left: 15,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 30,
  },
});
