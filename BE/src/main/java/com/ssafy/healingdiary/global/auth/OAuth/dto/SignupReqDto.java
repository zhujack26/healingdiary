package com.ssafy.healingdiary.global.auth.OAuth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupReqDto {

    private LoginReqDto userInfo;


    private GoogleOAuthTokenReqDto googleTokenInfo;

    private KakaoOAuthTokenReqDto kakaoTokenInfo;

}
