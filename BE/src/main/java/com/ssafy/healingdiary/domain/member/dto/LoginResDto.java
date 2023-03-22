package com.ssafy.healingdiary.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResDto {

    private Long id;

    private String nickname;

    private String email;
    private String region;

    private String disease;

    private String memberImageUrl;

    private String jwt_token;

}
