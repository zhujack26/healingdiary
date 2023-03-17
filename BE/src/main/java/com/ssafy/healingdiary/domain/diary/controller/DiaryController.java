package com.ssafy.healingdiary.domain.diary.controller;


import com.ssafy.healingdiary.domain.diary.dto.CalendarResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.DiaryDetailResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import com.ssafy.healingdiary.domain.diary.dto.EmotionResponse;
import com.ssafy.healingdiary.domain.diary.service.DiaryService;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/diaries")
public class DiaryController {

    private final DiaryService diaryService;

    @GetMapping
    public List<DiaryListResponse> getDiaryList(
        Authentication authentication,
        @RequestParam(required = false) Long clubId,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String tag,
        @RequestParam(required = false) LocalDate date,
        Pageable pageable
    ){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return diaryService.getDiaryList(principal,clubId,keyword,tag,date,pageable);
    }

    @GetMapping("/{diaryId}")
    public DiaryDetailResponse getDiaryDetail(Authentication authentication, @PathVariable Long diaryId){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return diaryService.getDiaryDetail(principal,diaryId);
    }

    @PostMapping
    public Long createDiary(Authentication authentication, @RequestBody DiaryCreateRequest diaryCreateRequest){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return diaryService.createDiary(principal, diaryCreateRequest);
    }

    @DeleteMapping("/{diaryId}")
    public void deleteDiary(Authentication authentication, @PathVariable Long diaryId){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        diaryService.deleteDiary(principal,diaryId);
    }

    @GetMapping("/calendar")
    public List<CalendarResponse> getCalendar(Authentication authentication, @RequestParam int year, @RequestParam int month){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return diaryService.getCalendar(principal,year, month);
    }

    @GetMapping("/emotion")
    public List<EmotionResponse> getEmotionStatistics(Authentication authentication, @RequestParam int year, @RequestParam int month){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return diaryService.getEmotionStatistics(principal,year, month);
    }
}
