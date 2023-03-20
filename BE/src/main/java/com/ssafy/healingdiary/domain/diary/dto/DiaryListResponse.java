package com.ssafy.healingdiary.domain.diary.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Data
public class DiaryListResponse {
    Long diaryId;
    String imageSrc;
    LocalDateTime createdDate;
    List<String> tags;
}
