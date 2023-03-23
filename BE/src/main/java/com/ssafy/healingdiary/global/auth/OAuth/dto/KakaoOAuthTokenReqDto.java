package com.ssafy.healingdiary.global.auth.OAuth.dto;

import lombok.Data;

@Data
public class KakaoOAuthTokenReqDto {

    private String accessToken;
    private int expiresIn;
    private String scope;
    private String tokenType;

    private String idToken;

    private String refreshToken;
    private int refreshTokenExpiresIn;
}
