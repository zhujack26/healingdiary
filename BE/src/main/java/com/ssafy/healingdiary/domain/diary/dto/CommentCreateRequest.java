package com.ssafy.healingdiary.domain.diary.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentCreateRequest {
    private Long memberId;
    private Long parentId;
    private String content;
}
