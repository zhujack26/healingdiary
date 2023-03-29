package com.ssafy.healingdiary.domain.club.service;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.club.domain.ClubTag;
import com.ssafy.healingdiary.domain.club.dto.ClubApprovalResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubInvitationResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubJoinResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubMemberResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterRequest;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.dto.InvitationRegisterRequest;
import com.ssafy.healingdiary.domain.club.dto.InvitationRegisterResponse;
import com.ssafy.healingdiary.domain.club.repository.ClubMemberRepository;
import com.ssafy.healingdiary.domain.club.repository.ClubRepository;
import com.ssafy.healingdiary.domain.club.repository.ClubTagRepository;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.domain.Notice;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.domain.member.repository.NoticeRepository;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.domain.tag.repository.TagRepository;
import com.ssafy.healingdiary.global.error.CustomException;
import com.ssafy.healingdiary.global.error.ErrorCode;
import com.ssafy.healingdiary.infra.storage.S3StorageClient;
import java.io.IOException;
import java.util.ArrayList;
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
    private final ClubTagRepository clubTagRepository;
    private final MemberRepository memberRepository;
    private final NoticeRepository noticeRepository;
    private final TagRepository tagRepository;
    private final S3StorageClient s3Service;

    public Slice<ClubSimpleResponse> getClubListByTag(
//        UserDetails principal,
        boolean all,
        Long tag,
        String keyword,
        Pageable pageable) {

        Long id = null;
        if (!all) {
            id = 1L;
        }
        Slice<ClubSimpleResponse> clubSimpleResponseList = clubRepository.findByIdAndTagId(id, tag,
            keyword, pageable);
        return clubSimpleResponseList;
    }

    public Slice<ClubInvitationResponse> getInvitationList(Long clubId, Pageable pageable) {
        Long hostId = 1L; // 방장 ID
        Slice<ClubInvitationResponse> clubInvitationResponseList = clubMemberRepository.findDistinctByClubIdNot(
            clubId, hostId, pageable);
        return clubInvitationResponseList;
    }

    public ClubRegisterResponse registClub(ClubRegisterRequest registerRequest,
        MultipartFile file) throws IOException {
        Member member = memberRepository.findById(1L).get();
        String imageUrl = s3Service.uploadFile(file);
        List<ClubTag> clubTags = new ArrayList<>();
        Club club = ClubRegisterRequest.toEntity(registerRequest, member, imageUrl);
        registerRequest.getTags().stream()
            .forEach((tagId) -> {
                Tag tag = tagRepository.findById(tagId)
                    .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
                ClubTag clubTag = ClubRegisterRequest.toEntity(club, tag);
                clubTags.add(clubTag);
                clubTagRepository.save(clubTag);
            });
        club.addTags(clubTags);
        clubRepository.save(club);
        Long clubId = club.getId();
        return ClubRegisterResponse.of(clubId);
    }

    public InvitationRegisterResponse registInvitation(Long clubId,
        InvitationRegisterRequest request) {
        Member member = memberRepository.findById(request.getMemberId())
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        Club club = clubRepository.findById(clubId).get();

        ClubMember clubMember = clubMemberRepository.findByClubAndMember(club, member);
        if (clubMember == null) {
            clubMemberRepository.save(InvitationRegisterRequest.toEntity(club, member));
            noticeRepository.save(Notice.toEntity(member, club.getName() + " 소모임에 초대되었습니다.",
                "/invitation/club/" + clubId));
        } else {
            return InvitationRegisterResponse.of("이미 초대된 사용자입니다.");
        }
        return InvitationRegisterResponse.of(clubId);
    }

    public void leaveClub(Long clubId, Long memberId) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));
        Member member = memberRepository.findById(memberId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_USER));
        ClubMember clubMember = clubMemberRepository.findByClubAndMember(club, member);
        clubMemberRepository.delete(clubMember);
    }

    public ClubApprovalResponse approveClub(Long clubMemberId) {
        ClubMember clubMember = clubMemberRepository.findById(clubMemberId)
            .orElseThrow(() -> new CustomException(ErrorCode.ENTITY_NOT_FOUND));
        clubMember.approve();
        clubMemberRepository.save(clubMember);

        Long clubId = clubMember.getClub().getId();

        return ClubApprovalResponse.of(clubId, clubMemberId);
    }

    public ClubJoinResponse joinClub(Long clubId) {
        Member member = memberRepository.findById(1L).get(); // 가입 신청한 사용자
        Club club = clubRepository.findById(clubId).get();
        ClubMember clubMember = clubMemberRepository.findByClubAndMember(club, member);
        if (clubMember == null) {
            clubMemberRepository.save(InvitationRegisterRequest.toEntity(club, member));
            noticeRepository.save(Notice.toEntity(club.getHost(),
                member.getNickname() + "님께서 " + club.getName() + " 소모임에 가입신청을 하였습니다.",
                "/invitation/club/" + clubId));
        } else {
            return ClubJoinResponse.of("이미 신청한 소모임입니다.");
        }
        return ClubJoinResponse.of(clubId);
    }

    public Slice<ClubMemberResponse> getClubMemberList(Long clubId, Pageable pageable) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));
        Slice<ClubMember> list = clubMemberRepository.findByClubAndIsApproved(club, true, pageable);
        List<ClubMemberResponse> clubMemberResponses = list.stream()
            .map((clubMember ->
                ClubMemberResponse.of(clubMember.getId(), clubMember.getMember())
            ))
            .collect(Collectors.toList());
        return new SliceImpl<>(clubMemberResponses, pageable, list.hasNext());
    }

    public void deleteClub(Long clubId) {
        Club club = clubRepository.findById(clubId)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_CLUB));
        club.getClubMember().stream().forEach((clubMember -> {
            clubMemberRepository.delete(clubMember);
        }));
        club.getClubTag().stream().forEach(clubTag -> {
            clubTagRepository.delete(clubTag);
        });
        clubRepository.delete(club);
    }
}
