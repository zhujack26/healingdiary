package com.ssafy.healingdiary.global.auth.OAuth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginReqDto {



    private String nickname;
    private String email;
//    private String roles;

    private String region;

    private String disease;
    @JsonProperty("member_image_url")
    private String memberImageUrl;

}
