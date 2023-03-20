package com.ssafy.healingdiary.domain.diary.service;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.diary.dto.CalendarResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.DiaryDetailResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import com.ssafy.healingdiary.domain.diary.dto.EmotionResponse;
import com.ssafy.healingdiary.domain.diary.repository.DiaryRepository;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;

    public Slice<DiaryListResponse> getDiaryList(
//        UserDetails principal,
        Long clubId,
        String keyword,
        String tag,
        LocalDate date,
        Pageable pageable){

        Slice<DiaryListResponse> slice = diaryRepository.findByOption(clubId,keyword,tag,date,pageable);
        return slice;
    }

//    public DiaryDetailResponse getDiaryDetail(UserDetails principal, Long diaryId) {
    public DiaryDetailResponse getDiaryDetail(Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId).orElseThrow();
        DiaryDetailResponse diaryDetailResponse = DiaryDetailResponse.of(diary);
        return diaryDetailResponse;
    }

//    public Map<String, Object> createDiary(UserDetails principal, DiaryCreateRequest diaryCreateRequest) {
    public Map<String, Object> createDiary(DiaryCreateRequest diaryCreateRequest) {
        Map<String, Object> map = new HashMap<>();
        map.put("diaryId", 1L);
        return map;
    }

//    public void deleteDiary(UserDetails principal, Long diaryId) {
    public void deleteDiary(Long diaryId) {
        diaryRepository.deleteById(diaryId);
    }

//    public List<CalendarResponse> getCalendar(UserDetails principal, int year, int month) {
    public List<CalendarResponse> getCalendar(int year, int month) {
        List<CalendarResponse> calendarList = new ArrayList<>();
        return calendarList;
    }

//    public List<EmotionResponse> getEmotionStatistics(UserDetails principal, int year, int month) {
    public List<EmotionResponse> getEmotionStatistics(int year, int month) {
        List<EmotionResponse> emotionList = new ArrayList<>();
        return emotionList;
    }

}
