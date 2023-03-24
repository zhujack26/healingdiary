package com.ssafy.healingdiary.domain.diary.repository;

import com.ssafy.healingdiary.domain.diary.dto.DiarySimpleResponse;
import java.time.LocalDate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepositoryCustom {
    Slice<DiarySimpleResponse> findByOption(Long clubId, String keyword, String tagContent, Integer year, Integer month, Integer day, Pageable pageable);
}
