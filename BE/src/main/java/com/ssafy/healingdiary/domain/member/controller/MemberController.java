package com.ssafy.healingdiary.domain.member.controller;


import com.ssafy.healingdiary.domain.member.dto.*;
import com.ssafy.healingdiary.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public MemberInfoResponse memberDetailInfo(@RequestHeader(value="Authorization") String authorization){

        String accessToken = authorization.replace("Bearer ", "");

        // 사용자 조회


        return memberService.memberInfoFind(accessToken);
    }

    @PostMapping("/info")
    public MemberUpdateResponse memberInfoUpdate(@RequestHeader(value="Authorization") String authorization,
                                                 @RequestBody MemberUpdateRequest memberUpdateRequest){
        String accessToken = authorization.replace("Bearer ", "");

        // 사용자 정보 수정

        return memberService.memberUpdate(accessToken, memberUpdateRequest);


    }

    @PostMapping("/nickname")
    public NicknameCheckResponse result (@RequestBody NicknameCheckRequest memberNickname){
        // 닉네임 조회

        return memberService.nicknameCheck(memberNickname);
    }


}
