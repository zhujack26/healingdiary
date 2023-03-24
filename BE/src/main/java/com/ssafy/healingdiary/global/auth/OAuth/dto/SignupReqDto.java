package com.ssafy.healingdiary.global.auth.OAuth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class SignupReqDto {

    @JsonProperty("user_info")
    private LoginReqDto userInfo;



    @JsonProperty("google_token_info")
    private GoogleOAuthTokenReqDto googleTokenInfo;

    @JsonProperty("kakao_token_info")
    private KakaoOAuthTokenReqDto kakaoTokenInfo;

}
