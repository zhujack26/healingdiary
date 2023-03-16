package com.ssafy.healingdiary.domain.diary.controller;


import com.ssafy.healingdiary.domain.diary.dto.DiaryCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.DiaryDetailResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import com.ssafy.healingdiary.domain.diary.service.DiaryService;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
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
    public DiaryListResponse getDiaryList(
        @RequestParam(required = false) Long clubId,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) String tag,
        @RequestParam(required = false) LocalDateTime date
    ){
        return diaryService.getDiaryList(clubId,keyword,tag,date);
    }

    @GetMapping("/{diaryId}")
    public DiaryDetailResponse getDiaryDetail(@PathVariable Long diaryId){
        return diaryService.getDiaryDetail(diaryId);
    }

    @PostMapping
    public String createDiary(@RequestBody DiaryCreateRequest diaryCreateRequest){
        return diaryService.createDiary(diaryCreateRequest);
    }

    @DeleteMapping("/{diaryId}")
    public void deleteDiary(@PathVariable Long diaryId){
        diaryService.deleteDiary(diaryId);
    }

}
