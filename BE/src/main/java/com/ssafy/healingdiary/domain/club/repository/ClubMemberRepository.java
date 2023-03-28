package com.ssafy.healingdiary.domain.club.repository;

import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClubMemberRepository extends JpaRepository<ClubMember, Long> {
    Slice<ClubMember> findDistinctByClubIdNot(Long clubId, Pageable pageable);
}
