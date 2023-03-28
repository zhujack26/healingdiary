package com.ssafy.healingdiary.global.auth.OAuth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;

@Data
public class KakaoOauthTokenResDto {
    @JsonProperty("properties")
    private KakaoOauthTokenResProperties kakaoOauthTokenResProperties;
    @JsonProperty("kakao_account")
    private KakaoOauthTokenResAccount kakaoOauthTokenResAccount;



}
