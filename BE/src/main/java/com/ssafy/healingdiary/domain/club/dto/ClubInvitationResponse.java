package com.ssafy.healingdiary.domain.club.dto;

import com.ssafy.healingdiary.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubInvitationResponse {
    private String nickname;
    private String imageUrl;

    public static ClubInvitationResponse of(Member member) {
        return ClubInvitationResponse.builder()
            .nickname(member.getNickname())
            .imageUrl(member.getMemberImageUrl())
            .build();
    }
}
