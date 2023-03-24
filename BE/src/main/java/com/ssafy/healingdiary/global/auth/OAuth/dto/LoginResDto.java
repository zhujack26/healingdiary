package com.ssafy.healingdiary.global.auth.OAuth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;


@Getter
@Builder
@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
public class LoginResDto {

    private Long id;

    private String nickname;

    private String email;
    private String region;

    private String disease;

    private String memberImageUrl;

    private String jwtToken;

}
