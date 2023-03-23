package com.ssafy.healingdiary.global.auth.OAuth.dto;

import lombok.Data;

@Data
public class GoogleOAuthTokenResDto {

    public String id;
    public String email;
    public String name;
    public String givenName;
    public String familyName;
    public String picture;
    public String locale;
}
