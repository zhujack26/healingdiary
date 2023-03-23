package com.ssafy.healingdiary.global.auth.OAuth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KakaoOAuthTokenResDto {

    @JsonProperty("profile_nickname")
    public String nickname;

    @JsonProperty("account_email")
    public String email;
    @JsonProperty("profile_image")
    public String picture;

}
