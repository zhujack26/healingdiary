package com.ssafy.healingdiary.domain.club.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubSimpleResponse {
    Long clubId;
    String name;
    String clubImageUrl;
    List<String> tags;

    @QueryProjection
    public ClubSimpleResponse(Long clubId, String clubImageUrl, String name, List<String> tags) {
        this.clubId = clubId;
        this.name = name;
        this.clubImageUrl = clubImageUrl;
        this.tags = tags;
    }
}
