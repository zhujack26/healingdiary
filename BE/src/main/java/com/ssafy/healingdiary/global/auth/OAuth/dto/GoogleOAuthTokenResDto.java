package com.ssafy.healingdiary.global.auth.OAuth.dto;

import lombok.Data;

@Data
public class GoogleOAuthTokenResDto {

    public String email;

    public String name;
    public String picture;

}
