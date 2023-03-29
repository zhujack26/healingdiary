package com.ssafy.healingdiary.domain.diary.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmotionStatisticResponse {
    private int code;
    private String value;
    private Long count;

    @QueryProjection
    public EmotionStatisticResponse(int code, String value, Long count) {
        this.code = code;
        this.value = value;
        this.count = count;
    }
}
