package com.ssafy.healingdiary.domain.club.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ClubRegisterResponse {
    Long clubId;

    public ClubRegisterResponse of(Long clubId) {
        return ClubRegisterResponse.builder()
            .clubId(clubId)
            .build();
    }
}
