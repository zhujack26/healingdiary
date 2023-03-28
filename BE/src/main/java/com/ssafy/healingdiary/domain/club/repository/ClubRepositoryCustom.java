package com.ssafy.healingdiary.domain.club.repository;

import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

public interface ClubRepositoryCustom {

    Slice<ClubSimpleResponse> findByIdAndTagId(Long id, Long tag, String keyword, Pageable pageable);

}
