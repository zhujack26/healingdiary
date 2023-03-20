package com.ssafy.healingdiary.domain.diary.repository;

import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import java.time.LocalDate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

@Repository
public interface DiaryRepositoryCustom {
    Slice<DiaryListResponse> findByOption(Long clubId, String keyword, String tagContent, LocalDate date, Pageable pageable);
}
