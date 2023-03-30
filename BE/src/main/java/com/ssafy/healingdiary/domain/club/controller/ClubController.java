package com.ssafy.healingdiary.domain.club.controller;


import com.ssafy.healingdiary.domain.club.dto.ClubApprovalResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubDetailResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubInvitationResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubJoinResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubMemberResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterRequest;
import com.ssafy.healingdiary.domain.club.dto.ClubRegisterResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubUpdateRequest;
import com.ssafy.healingdiary.domain.club.dto.ClubUpdateResponse;
import com.ssafy.healingdiary.domain.club.dto.InvitationRegisterRequest;
import com.ssafy.healingdiary.domain.club.dto.InvitationRegisterResponse;
import com.ssafy.healingdiary.domain.club.service.ClubService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/clubs")
public class ClubController {

    private final ClubService clubService;

    @GetMapping
    public Slice<ClubSimpleResponse> getClubList(
//        Authentication authentication,
        boolean all,
        @RequestParam(required = false) String keyword,
        @RequestParam(required = false) Long tag,
        Pageable pageable
    ) {
        return clubService.getClubListByTag(all, tag, keyword, pageable);
    }

    @GetMapping("/{clubId}")
    public ClubDetailResponse getDetailClub(@PathVariable Long clubId) {
        return clubService.getDetailClub(clubId);
    }

    @DeleteMapping("/{clubId}")
    public void deleteClub(@PathVariable Long clubId) {
        clubService.deleteClub(clubId);
    }

    @GetMapping("/{clubId}/members")
    public Slice<ClubMemberResponse> getClubMemberList(@PathVariable Long clubId,
        Pageable pageable) {
        return clubService.getClubMemberList(clubId, pageable);
    }

    @GetMapping("/{clubId}/invitation")
    public Slice<ClubInvitationResponse> getInvitationList(@PathVariable Long clubId,
        Pageable pageable) {
        return clubService.getInvitationList(clubId, pageable);
    }

    @PostMapping("/{clubId}/invitation")
    public InvitationRegisterResponse registInvitation(@PathVariable Long clubId,
        @RequestBody InvitationRegisterRequest request) {
        return clubService.registInvitation(clubId, request);
    }

    @PostMapping
    public ClubRegisterResponse registClub(
        @RequestPart(value = "ClubRegister") ClubRegisterRequest request,
        @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return clubService.registClub(request, file);
    }

    @PostMapping("/{clubId}")
    public ClubUpdateResponse updateClub(
        @PathVariable Long clubId,
        @RequestPart(value = "ClubUpdateRequest") ClubUpdateRequest request,
        @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        return clubService.updateClub(clubId, request, file);
    }

    @PostMapping("/{clubId}/join")
    public ClubJoinResponse joinClub(@PathVariable Long clubId) {
        return clubService.joinClub(clubId);
    }

    @DeleteMapping("/{clubId}/{clubMemberId}")
    public void leaveClub(@PathVariable Long clubId, @PathVariable Long clubMemberId) {
        clubService.leaveClub(clubId, clubMemberId);
    }

    @PatchMapping("/{clubMemberId}/approval")
    public ClubApprovalResponse approveClub(@PathVariable Long clubMemberId) {
        return clubService.approveClub(clubMemberId);
    }
}
