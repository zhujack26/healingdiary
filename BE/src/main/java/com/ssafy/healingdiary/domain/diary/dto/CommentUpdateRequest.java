package com.ssafy.healingdiary.domain.diary.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentUpdateRequest {
    private Long commentId;
    private Long memberId;
    private String content;
}
