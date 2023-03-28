package com.ssafy.healingdiary.domain.club.dto;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.member.domain.Member;
import lombok.Getter;

@Getter
public class ClubRegisterRequest {
    String name;
    String description;

    public static Club toEntity(ClubRegisterRequest request, Member member, String imageUrl) {
        return Club.builder()
            .name(request.getName())
            .description(request.getDescription())
            .host(member)
            .clubImageUrl(imageUrl)
            .build();
    }
}
