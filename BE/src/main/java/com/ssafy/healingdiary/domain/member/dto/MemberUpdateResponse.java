package com.ssafy.healingdiary.domain.member.dto;

import com.ssafy.healingdiary.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;
@Getter
@Builder
public class MemberUpdateResponse {
    private String nickname;

    private String disease;

    private String region;

    public static MemberUpdateResponse of(Member member){
        return MemberUpdateResponse.builder()
                .nickname(member.getNickname())
                .disease(member.getDisease())
                .region(member.getRegion())
                .build();

    }
}
