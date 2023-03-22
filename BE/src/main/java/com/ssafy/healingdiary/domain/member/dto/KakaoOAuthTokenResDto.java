package com.ssafy.healingdiary.domain.member.dto;

import lombok.Data;

@Data
public class KakaoOAuthTokenResDto {
    public String id;
    public String email;
    public String name;
    public String givenName;
    public String familyName;
    public String picture;
    public String locale;

}
