package com.ssafy.healingdiary.global.auth.OAuth.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.member.domain.Member;
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

    public static LoginResDto toEntity(Member member, String jwtToken) {
        return LoginResDto.builder()
                .id(member.getId())
                .email(member.getProviderEmail())
                .region(member.getRegion())
                .disease(member.getDisease())
                .nickname(member.getNickname())
                .memberImageUrl(member.getMemberImageUrl())
                .jwtToken(jwtToken)
                .build();
    }

}
