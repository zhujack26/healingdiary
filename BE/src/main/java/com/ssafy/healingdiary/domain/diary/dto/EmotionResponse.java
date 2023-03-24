package com.ssafy.healingdiary.domain.diary.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.healingdiary.domain.diary.domain.Emotion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmotionResponse {
    private int code;
    private String value;

    @QueryProjection
    public EmotionResponse(int code, String value) {
        this.code = code;
        this.value = value;
    }

    public static EmotionResponse of(Emotion emotion){
        return EmotionResponse.builder()
            .code(emotion.getCode())
            .value(emotion.getValue())
            .build();
    }
}
