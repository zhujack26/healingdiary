package com.ssafy.healingdiary.domain.member.dto;


import lombok.Builder;
import lombok.Getter;

import static io.swagger.models.properties.PropertyBuilder.build;

@Getter
@Builder
public class NicknameCheck {

    private Boolean result;

    public static NicknameCheck of(Boolean result){
        return NicknameCheck.builder()
                .result(result)
                .build();
    }
}
