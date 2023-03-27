package com.ssafy.healingdiary.domain.diary.repository;

import com.ssafy.healingdiary.domain.diary.dto.CalendarResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiarySimpleResponse;
import com.ssafy.healingdiary.domain.diary.dto.EmotionStatisticResponse;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepositoryCustom {
    Slice<DiarySimpleResponse> findByOption(Long clubId, String keyword, String tagContent, Integer year, Integer month, Integer day, Pageable pageable);
    List<EmotionStatisticResponse> countEmotion(Long memberId, int year, int month);
    List<CalendarResponse> getEmotionByMonthOfYear(Long memberId, int year, int month);
}
