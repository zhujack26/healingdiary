package com.ssafy.healingdiary.global.auth.OAuth.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class SignupReqDto {

    private String provider;
    private String nickname;
    private String email;
    private String region;
    private String disease;



}
