package com.ssafy.healingdiary.domain.member.dto;

import lombok.Data;

@Data
public class GoogleOAuthTokenReqDto {

    private String accessToken;
    private int expiresIn;
    private String scope;
    private String tokenType;

    private String idToken;


}
