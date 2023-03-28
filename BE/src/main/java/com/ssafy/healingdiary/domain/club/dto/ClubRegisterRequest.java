package com.ssafy.healingdiary.domain.club.dto;

import com.ssafy.healingdiary.domain.club.domain.Club;
import lombok.Getter;

@Getter
public class ClubRegisterRequest {
    String name;
    String description;

    public static Club toEntity(ClubRegisterRequest request) {
        return Club.builder().build();
    }
}
