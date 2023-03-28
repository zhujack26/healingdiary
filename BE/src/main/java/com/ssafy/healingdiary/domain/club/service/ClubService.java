package com.ssafy.healingdiary.domain.club.service;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.club.dto.ClubInvitationResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterRequest;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.dto.InvitationRegisterRequest;
import com.ssafy.healingdiary.domain.club.repository.ClubMemberRepository;
import com.ssafy.healingdiary.domain.club.repository.ClubRepository;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.domain.Notice;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.domain.member.repository.NoticeRepository;
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
    private final NoticeRepository noticeRepository;
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
            noticeRepository.save(Notice.toEntity(member, club.getName()+" 소모임에 초대되었습니다.", "/invitation/club/1"));
        });
    }

    public void leaveClub(Long clubId, Long memberId) {
        Club club = clubRepository.findById(clubId).get();
        Member member = memberRepository.findById(memberId).get();
        ClubMember clubMember = clubMemberRepository.findByClubAndMember(club, member);
        clubMemberRepository.delete(clubMember);
    }

    public void approveClub(Long clubMemberId) {
        ClubMember clubMember = clubMemberRepository.findById(clubMemberId).get();
        clubMember.approve();
        clubMemberRepository.save(clubMember);
    }
}
