package com.ssafy.healingdiary.domain.diary.service;

import com.google.gson.Gson;
import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.diary.dto.CalendarResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.DiaryDetailResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiarySimpleResponse;
import com.ssafy.healingdiary.domain.diary.dto.EmotionStatisticResponse;
import com.ssafy.healingdiary.domain.diary.repository.DiaryRepository;
import com.ssafy.healingdiary.global.error.CustomException;
import com.ssafy.healingdiary.global.error.ErrorCode;
import com.ssafy.healingdiary.infra.speech.ClovaClient;
import com.ssafy.healingdiary.infra.speech.ClovaSpeechClient;
import com.ssafy.healingdiary.infra.speech.ClovaSpeechClient.NestRequestEntity;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
    private final ClovaSpeechClient clovaSpeechClient;
    private final ClovaClient clovaClient;
    private final Gson gson;

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
    public List<EmotionStatisticResponse> getEmotionStatistics(Long memberId, Integer year, Integer month) {
        List<EmotionStatisticResponse> emotionList = diaryRepository.countEmotion(memberId, year, month);
        return emotionList;
    }

    public Map<String, Object> analyzeDiary(MultipartFile rec) throws IOException{

        String originalFile = rec.getOriginalFilename();

        int pos = originalFile.lastIndexOf(".");
        String type = originalFile.substring(pos + 1);

//        String saveFolder = "/healing/records/";
        String saveFolder = "C:\\Users\\SSAFY\\Desktop\\SSAFY\\특화프로젝트\\record\\";
        String saveFile = UUID.randomUUID() + "." + type;

        File file = new File(saveFolder + saveFile);
        file.getParentFile().mkdirs();
        rec.transferTo(file);

        NestRequestEntity requestEntity = new NestRequestEntity();
        String result = clovaSpeechClient.upload(file, requestEntity);
        Map<String, Object> sttMap = gson.fromJson(result, Map.class);

//        String summary = clovaClient.summerize(sttMap.get("text").toString());
//        Map<String, Object> summaryMap = gson.fromJson(summary, Map.class);
//
//        String analysis = clovaClient.analyze(summaryMap.get("summary").toString());

        String analysis = clovaClient.analyze(sttMap.get("text").toString());
        Map<String, Object> analysisMap = gson.fromJson(analysis, Map.class);
        analysisMap.put("content", sttMap.get("text").toString());

        return analysisMap;
    }
}
