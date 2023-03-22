package com.ssafy.healingdiary.domain.member.dto;

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
