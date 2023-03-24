package com.ssafy.healingdiary.domain.club.controller;


import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.service.ClubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.GetMapping;
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
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long tag,
            Pageable pageable
    ){
//        UserDetails principal = (UserDetails) authentication.getPrincipal();
        if (tag !=null){
            return clubService.getClubListByTag(tag, pageable);
        }
        else if(keyword !=null){
            return clubService.getClubListByKeyword(keyword, pageable);
        }
        else {
            return null;
        }

    }


}
