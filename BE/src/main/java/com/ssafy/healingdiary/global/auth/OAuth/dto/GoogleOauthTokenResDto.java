package com.ssafy.healingdiary.global.auth.OAuth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Builder
public class GoogleOauthTokenResDto {

    public String email;

    public String name;
    @JsonProperty(namespace = "member_image_url")
    public String memberImageUrl;

}
