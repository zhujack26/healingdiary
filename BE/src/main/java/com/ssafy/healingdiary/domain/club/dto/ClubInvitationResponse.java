package com.ssafy.healingdiary.domain.club.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.healingdiary.domain.diary.dto.EmotionResponse;
import com.ssafy.healingdiary.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubInvitationResponse {
    private String nickname;
    private String memberImageUrl;

    @QueryProjection
    public ClubInvitationResponse(String nickname, String memberImageUrl) {
        this.nickname = nickname;
        this.memberImageUrl = memberImageUrl;
    }

//    public static ClubInvitationResponse of(Member member) {
//        return ClubInvitationResponse.builder()
//            .nickname(member.getNickname())
//            .imageUrl(member.getMemberImageUrl())
//            .build();
//    }
}
