package com.ssafy.healingdiary.domain.diary.dto;

import com.querydsl.core.annotations.QueryProjection;
import java.time.LocalDateTime;
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

    @QueryProjection
    public CommentResponse(Long commentId, Long memberId, Long parentId, String memberImageUrl, String nickname,
        LocalDateTime datetime, String content) {
        this.commentId = commentId;
        this.memberId = memberId;
        this.parentId = parentId;
        this.memberImageUrl = memberImageUrl;
        this.nickname = nickname;
        this.datetime = datetime;
        this.content = content;
    }
}
