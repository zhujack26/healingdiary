package com.ssafy.healingdiary.domain.club.controller;


import com.ssafy.healingdiary.domain.club.dto.ClubInvitationResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
       return clubService.getClubListByTag(all,tag,keyword,pageable);
    }

    @GetMapping("/invitation/{clubId}")
    public Slice<ClubInvitationResponse> getInvitationList(@PathVariable Long clubId, Pageable pageable) {
        return clubService.getInvitationList(clubId, pageable);
    }
}
