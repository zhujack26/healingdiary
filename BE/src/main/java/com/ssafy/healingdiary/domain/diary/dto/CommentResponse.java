package com.ssafy.healingdiary.domain.diary.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.healingdiary.domain.diary.domain.Comment;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentResponse {
    private Long commentId;
    private Long memberId;
    private Long parentId;
    private String memberImageUrl;
    private String nickname;
    private LocalDateTime datetime;
    private String content;
    private List<CommentResponse> children;

}
