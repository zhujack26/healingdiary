package com.ssafy.healingdiary.global.jwt;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.MemberUpdateResponse;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenRegenerateResponse {
    private String accessToken;



    public static TokenRegenerateResponse of(String accessToken) {
        return TokenRegenerateResponse.builder()
                .accessToken(accessToken)
                .build();

    }
}
