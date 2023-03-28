package com.ssafy.healingdiary.domain.diary.service;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.diary.dto.CalendarResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.DiaryDetailResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiarySimpleResponse;
import com.ssafy.healingdiary.domain.diary.dto.EmotionStatisticResponse;
import com.ssafy.healingdiary.domain.diary.repository.DiaryRepository;
import com.ssafy.healingdiary.global.error.CustomException;
import com.ssafy.healingdiary.global.error.ErrorCode;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class DiaryService {

    private final DiaryRepository diaryRepository;


    public Slice<DiarySimpleResponse> getDiaryList(
        UserDetails principal,
        Long clubId,
        String keyword,
        String tag,
        Integer year,
        Integer month,
        Integer day,
        Pageable pageable) {

        Long memberId = null;
        if(principal != null) memberId = Long.valueOf(principal.getUsername());
        Slice<DiarySimpleResponse> slice = diaryRepository.findByOption(memberId, clubId,keyword,tag,year,month,day,pageable);
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
    public void deleteDiary(Long memberId, Long diaryId) {
        Diary diary = diaryRepository.findById(diaryId)
            .orElseThrow(() -> new CustomException(ErrorCode.COMMENT_NOT_FOUND));
        if(memberId != diary.getMember().getId()){
            throw new CustomException(ErrorCode.FORBIDDEN);
        }
        diaryRepository.deleteById(diaryId);
    }

//    public List<CalendarResponse> getCalendar(UserDetails principal, int year, int month) {
    public List<CalendarResponse> getCalendar(Long memberId, int year, int month) {
        List<CalendarResponse> calendarList = diaryRepository.getEmotionByMonthOfYear(memberId, year, month);
        return calendarList;
    }

//    public List<EmotionStatisticResponse> getEmotionStatistics(UserDetails principal, int year, int month) {
    public List<EmotionStatisticResponse> getEmotionStatistics(Long memberId, int year, int month) {
        List<EmotionStatisticResponse> emotionList = diaryRepository.countEmotion(memberId, year, month);
        return emotionList;
    }

    public Map<String, Object> analyzeDiary(MultipartFile record) {
        return null;
    }
}
