package com.ssafy.healingdiary.domain.diary.dto;

import com.ssafy.healingdiary.domain.diary.domain.Emotion;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EmotionResponse {
    private int code;
    private String value;

    public static EmotionResponse of(Emotion emotion){
        return EmotionResponse.builder()
            .code(emotion.getCode())
            .value(emotion.getValue())
            .build();
    }
}
