package com.ssafy.healingdiary.domain.diary.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DiaryListResponse {
    int pageNum;
    boolean isLast;
    List<DiaryListElementResponse> elements;
}
