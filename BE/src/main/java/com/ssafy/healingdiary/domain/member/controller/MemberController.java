package com.ssafy.healingdiary.domain.member.controller;


import com.ssafy.healingdiary.domain.member.dto.*;
import com.ssafy.healingdiary.domain.member.service.MemberService;
import com.ssafy.healingdiary.global.jwt.TokenRegenerateRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public MemberInfoResponse memberDetailInfo(Authentication authentication){

        // 사용자 조회
        UserDetails principal = (UserDetails) authentication.getPrincipal();

        return memberService.memberInfoFind(principal.getPassword());
    }

    @PostMapping("/info")
    public MemberUpdateResponse memberInfoUpdate(Authentication authentication,
                                                 @RequestPart(value = "update") MemberUpdateRequest memberUpdateRequest,
                                                 @RequestPart(value = "image_file")MultipartFile file) throws IOException {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return memberService.memberUpdate(principal.getPassword(),memberUpdateRequest, file);


    }

    @PostMapping("/nickname")
    public NicknameCheckResponse result (@RequestBody NicknameCheckRequest memberNickname){
        // 닉네임 조회

        return memberService.nicknameCheck(memberNickname);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(@Validated @RequestHeader TokenRegenerateRequest tokenRegenerateRequest,
                                     HttpServletRequest request) {

        return memberService.reissue(tokenRegenerateRequest,request);
    }


}
