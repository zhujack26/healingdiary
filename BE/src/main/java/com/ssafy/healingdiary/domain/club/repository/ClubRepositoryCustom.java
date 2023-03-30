package com.ssafy.healingdiary.domain.club.repository;

import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ClubRepositoryCustom {

    Slice<ClubSimpleResponse> findByOption(Boolean all, Long memberId, String keyword, String tagContent, Pageable pageable);
}
