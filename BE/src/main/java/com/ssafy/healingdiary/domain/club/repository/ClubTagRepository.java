package com.ssafy.healingdiary.domain.club.repository;

import com.ssafy.healingdiary.domain.club.domain.ClubTag;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ClubTagRepository extends JpaRepository<ClubTag,Long> {

    Slice<ClubTag> findByTagId(Long tag, Pageable pageable);
}
