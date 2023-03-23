package com.ssafy.healingdiary.domain.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.diary.domain.Emotion;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DiaryDetailResponse {
    private Long diaryId;
    private String recordUrl;
    private String imageUrl;
    private Emotion emotion;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime createdDate;
    List<String> tags;


    public static DiaryDetailResponse of(Diary diary){
        return DiaryDetailResponse.builder()
            .diaryId(diary.getId())
            .recordUrl(diary.getRecordUrl())
            .imageUrl(diary.getDiaryImageUrl())
            .emotion(diary.getEmotion())
            .createdDate(diary.getCreatedDate())
            .tags(diary.getDiaryTag()
                .stream()
                .map(diaryTag -> diaryTag.getTag().getContent())
                .collect(Collectors.toList()))
            .build();
    }
}
