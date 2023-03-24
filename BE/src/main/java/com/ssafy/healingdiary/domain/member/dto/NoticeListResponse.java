package com.ssafy.healingdiary.domain.member.dto;

import com.ssafy.healingdiary.domain.member.domain.CheckStatus;
import com.ssafy.healingdiary.domain.member.domain.Notice;
import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NoticeListResponse {

    private Long noticeId;
    private LocalDateTime createdTime;
    private String content;
    private String link;
    private boolean checkStatus;
    public static NoticeListResponse of(Notice notice) {
        return NoticeListResponse.builder()
            .noticeId(notice.getId())
            .createdTime(notice.getCreatedDate())
            .content(notice.getContent())
            .link(notice.getLink())
            .checkStatus(CheckStatus.ofFlag(notice.getCheckStatus()))
            .build();
    }
}
