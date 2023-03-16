package com.ssafy.healingdiary.domain.diary.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DiaryListElementResponse {
    Long diaryId;
    String imageSrc;
    List<String> tags;
    LocalDate date;
}
