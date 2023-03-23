package com.ssafy.healingdiary.global.auth.OAuth.dto;

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

    private String memberImageUrl;

}
