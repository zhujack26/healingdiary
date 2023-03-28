package com.ssafy.healingdiary.domain.member.controller;


import com.amazonaws.Response;
import com.ssafy.healingdiary.domain.member.dto.MemberInfo;
import com.ssafy.healingdiary.domain.member.dto.MemberUpdate;
import com.ssafy.healingdiary.domain.member.dto.NicknameCheck;
import com.ssafy.healingdiary.domain.member.dto.NicknameCheckReqDto;
import com.ssafy.healingdiary.domain.member.service.MemberService;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public MemberInfo memberDetailInfo(@RequestHeader(value="Authorization") String authorization){

        String accessToken = authorization.replace("Bearer ", "");

        // 사용자 조회


        return memberService.memberInfoFind(accessToken);
    }

    @PostMapping("/info")
    public MemberUpdate memberInfoUpdate(@RequestHeader(value="Authorization") String authorization,
                                                         @RequestBody MemberUpdate memberUpdate){
        String accessToken = authorization.replace("Bearer ", "");

        // 사용자 정보 수정

        return memberService.memberUpdate(accessToken,memberUpdate);


    }

    @PostMapping("/nickname")
    public NicknameCheck result (@RequestBody NicknameCheckReqDto memberNickname){
        // 닉네임 조회

        return memberService.nicknameCheck(memberNickname);
    }


}
