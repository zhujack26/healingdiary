package com.ssafy.healingdiary.domain.club.service;

import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.club.dto.ClubInvitationResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterRequest;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.repository.ClubMemberRepository;
import com.ssafy.healingdiary.domain.club.repository.ClubRepository;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@AllArgsConstructor
public class ClubService {

    private final ClubRepository clubRepository;
    private final ClubMemberRepository clubMemberRepository;
    private final MemberRepository memberRepository;
    public Slice<ClubSimpleResponse> getClubListByTag(
//        UserDetails principal,
            boolean all,
            Long tag,
            String keyword,
            Pageable pageable) {

        Long id = null;
        if(!all) {
            id = 1L;

        }
        Slice<ClubSimpleResponse> clubSimpleResponseList = clubRepository.findByIdAndTagId(id, tag, keyword, pageable);

        return clubSimpleResponseList;
    }

    public Slice<ClubInvitationResponse> getInvitationList(Long clubId, Pageable pageable) {
        Slice<ClubMember> list = clubMemberRepository.findDistinctByClubIdNot(clubId, pageable);
        List<ClubInvitationResponse> clubInvitationResponseList = list.stream()
            .map((clubMember) -> ClubInvitationResponse.of(clubMember.getMember()))
            .collect(Collectors.toList());
        return new SliceImpl<ClubInvitationResponse>(clubInvitationResponseList, pageable, list.hasNext());
    }

    public ClubRegisterResponse registClub(ClubRegisterRequest registerRequest, MultipartFile file) {
        Member member = memberRepository.findById(1L).get();
        // image 저장
        clubRepository.save(ClubRegisterRequest.toEntity(registerRequest));
        return ClubRegisterResponse.builder().build();
    }
}
