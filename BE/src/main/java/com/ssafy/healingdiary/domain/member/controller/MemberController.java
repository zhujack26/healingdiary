package com.ssafy.healingdiary.domain.member.controller;


import com.ssafy.healingdiary.domain.member.dto.*;
import com.ssafy.healingdiary.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

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
                                                 @RequestPart(value = "update") MemberUpdateRequest memberUpdateRequest,
                                                 @RequestPart(value = "image_file")MultipartFile file) throws IOException {
        String accessToken = authorization.replace("Bearer ", "");
        return memberService.memberUpdate(accessToken, memberUpdateRequest, file);


    }

    @PostMapping("/nickname")
    public NicknameCheckResponse result (@RequestBody NicknameCheckRequest memberNickname){
        // 닉네임 조회

        return memberService.nicknameCheck(memberNickname);
    }


}
