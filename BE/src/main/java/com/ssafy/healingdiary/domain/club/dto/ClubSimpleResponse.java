package com.ssafy.healingdiary.domain.club.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ClubSimpleResponse {
    Long clubId;
    String name;

    String imageSrc;
    List<String> tags;

    @QueryProjection
    public ClubSimpleResponse(Long clubId, String imageSrc, String name, List<String> tags) {
        this.clubId = clubId;
        this.name = name;
        this.imageSrc = imageSrc;
        this.tags = tags;
    }
}
