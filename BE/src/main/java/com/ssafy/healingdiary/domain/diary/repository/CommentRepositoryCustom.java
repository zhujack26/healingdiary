package com.ssafy.healingdiary.domain.diary.repository;

import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepositoryCustom {
    Slice<CommentResponse> findByDiaryId(Long diaryId, Pageable pageable);
}
