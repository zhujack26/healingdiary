package com.ssafy.healingdiary.domain.club.service;

import com.ssafy.healingdiary.domain.club.domain.ClubTag;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.repository.ClubRepository;
import com.ssafy.healingdiary.domain.club.repository.ClubTagRepository;
import com.ssafy.healingdiary.domain.diary.dto.DiarySimpleResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;

    private final ClubTagRepository clubTagRepository;


    public Slice<ClubSimpleResponse> getClubList(
//        UserDetails principal,
            Long tag,
            Pageable pageable) {

        Slice<ClubTag> clubTags = clubTagRepository.findByTagId(tag, pageable);
        List<ClubSimpleResponse> clubSimpleResponseList = clubTags.stream()
                .map(clubTag -> ClubSimpleResponse.of(clubTag.getClub()))
                .collect(Collectors.toList());

        return new SliceImpl<ClubSimpleResponse>(clubSimpleResponseList, pageable, clubTags.hasNext());
    }
}
