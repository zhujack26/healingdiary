package com.ssafy.healingdiary.domain.diary.service;

import com.ssafy.healingdiary.domain.diary.dto.CalendarResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.DiaryDetailResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import com.ssafy.healingdiary.domain.diary.dto.EmotionResponse;
import com.ssafy.healingdiary.domain.diary.repository.DiaryRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public List<DiaryListResponse> getDiaryList(
        UserDetails principal,
        Long clubId,
        String keyword,
        String tag,
        LocalDate date,
        Pageable pageable){

        //Slice<DiaryListResponse> slice = diaryRepository.findList(clubId, keyword, tag, date, pageable);
        List<DiaryListResponse> diaryList = new ArrayList<>();
        return diaryList;
    }

    public DiaryDetailResponse getDiaryDetail(UserDetails principal, Long diaryId) {

        DiaryDetailResponse diaryDetailResponse = DiaryDetailResponse.builder().build();
        return diaryDetailResponse;
    }

    public Long createDiary(UserDetails principal, DiaryCreateRequest diaryCreateRequest) {
        return 1L;
    }

    public void deleteDiary(UserDetails principal, Long diaryId) {
    }


    public List<CalendarResponse> getCalendar(UserDetails principal, int year, int month) {
        List<CalendarResponse> calendarList = new ArrayList<>();
        return calendarList;
    }

    public List<EmotionResponse> getEmotionStatistics(UserDetails principal, int year, int month) {
        List<EmotionResponse> emotionList = new ArrayList<>();
        return emotionList;
    }

}
