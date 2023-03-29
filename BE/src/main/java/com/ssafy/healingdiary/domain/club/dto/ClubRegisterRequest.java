package com.ssafy.healingdiary.domain.club.dto;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.domain.ClubTag;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import java.util.List;
import lombok.Getter;

@Getter
public class ClubRegisterRequest {
    String name;
    String description;
    List<Long> tags;

    public static Club toEntity(ClubRegisterRequest request, Member member, String imageUrl) {
        return Club.builder()
            .name(request.getName())
            .description(request.getDescription())
            .host(member)
            .clubImageUrl(imageUrl)
            .build();
    }

    public static ClubTag toEntity(Club club, Tag tag) {
        return ClubTag.builder()
            .club(club)
            .tag(tag)
            .build();
    }
}
