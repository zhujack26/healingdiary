package com.ssafy.healingdiary.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.healingdiary.domain.member.domain.Member;
import lombok.Builder;
import lombok.Getter;


@Getter
@Builder
public class MemberInfo {

    private String nickname;

    private String imageSrc;

    private String disease;

    private String region;

    public static MemberInfo of(Member member){
        return MemberInfo.builder()
                .nickname(member.getNickname())
                .disease(member.getDisease())
                .imageSrc(member.getMemberImageUrl())
                .region(member.getRegion())
                .build();

    }
}
