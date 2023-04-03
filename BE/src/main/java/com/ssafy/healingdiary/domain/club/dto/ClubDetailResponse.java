package com.ssafy.healingdiary.domain.club.dto;

import com.ssafy.healingdiary.domain.club.domain.Club;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubDetailResponse {

    private Long clubId;
    private String name;
    private String description;
    private String clubImageUrl;
    private List<String> tags;

    public static ClubDetailResponse of(Club club, List<String> tags) {
        return ClubDetailResponse.builder()
            .clubId(club.getId())
            .name(club.getName())
            .description(club.getDescription())
            .clubImageUrl(club.getClubImageUrl())
            .tags(tags)
            .build();
    }
}
