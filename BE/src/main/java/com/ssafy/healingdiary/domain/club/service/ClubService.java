package com.ssafy.healingdiary.domain.club.service;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.dto.ClubInvitationResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterRequest;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.dto.InvitationRegisterRequest;
import com.ssafy.healingdiary.domain.club.repository.ClubMemberRepository;
import com.ssafy.healingdiary.domain.club.repository.ClubRepository;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
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
        Long hostId = 1L; // 방장 ID
        Slice<ClubInvitationResponse> clubInvitationResponseList = clubMemberRepository.findDistinctByClubIdNot(clubId, hostId, pageable);
        return clubInvitationResponseList;
    }

    public ClubRegisterResponse registClub(ClubRegisterRequest registerRequest, MultipartFile file) {
        Member member = memberRepository.findById(1L).get();
        // image 저장
        String imageUrl = "";
        clubRepository.save(ClubRegisterRequest.toEntity(registerRequest, member, imageUrl));
        return ClubRegisterResponse.builder().build();
    }

    public void registInvitationList(Long clubId, InvitationRegisterRequest request) {
        request.getList().stream().forEach((memberId) -> {
            Member member = memberRepository.findById(memberId).get();
            Club club = clubRepository.findById(clubId).get();
            clubMemberRepository.save(InvitationRegisterRequest.toEntity(club, member));
        });
    }
}
