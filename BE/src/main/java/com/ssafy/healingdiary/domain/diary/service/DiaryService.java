package com.ssafy.healingdiary.domain.diary.service;

import com.ssafy.healingdiary.domain.diary.dto.DiaryCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.DiaryDetailResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListElementResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import java.time.LocalDateTime;
import java.util.LinkedList;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaryService {

    public DiaryListResponse getDiaryList(Long clubId, String keyword, String tag, LocalDateTime date) {

        DiaryListResponse diaryListResponse = DiaryListResponse.builder().build();
        return diaryListResponse;
    }

    public DiaryDetailResponse getDiaryDetail(Long diaryId) {

        DiaryDetailResponse diaryDetailResponse = DiaryDetailResponse.builder().build();
        return diaryDetailResponse;
    }

    public String createDiary(DiaryCreateRequest diaryCreateRequest) {
        return "";
    }

    public void deleteDiary(Long diaryId) {
    }
}
