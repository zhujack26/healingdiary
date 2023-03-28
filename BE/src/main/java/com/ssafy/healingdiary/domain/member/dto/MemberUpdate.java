package com.ssafy.healingdiary.domain.member.dto;

import com.ssafy.healingdiary.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
@Getter
@Builder
public class MemberUpdate {
    private String nickname;

    private String disease;

    private String region;

    public static MemberUpdate of(Member member){
        return MemberUpdate.builder()
                .nickname(member.getNickname())
                .disease(member.getDisease())
                .region(member.getRegion())
                .build();

    }
}
