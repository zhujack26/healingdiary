package com.ssafy.healingdiary.domain.member.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberUpdateRequest {

    private String nickname;

    private String disease;

    private String region;

    @JsonProperty("image_url")
    private String imageUrl;

}
