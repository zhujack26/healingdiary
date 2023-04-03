package com.ssafy.healingdiary.domain.member.controller;


import com.ssafy.healingdiary.domain.member.dto.MemberInfoResponse;
import com.ssafy.healingdiary.domain.member.dto.MemberUpdateRequest;
import com.ssafy.healingdiary.domain.member.dto.MemberUpdateResponse;
import com.ssafy.healingdiary.domain.member.dto.NicknameCheckRequest;
import com.ssafy.healingdiary.domain.member.dto.NicknameCheckResponse;
import com.ssafy.healingdiary.domain.member.service.MemberService;
import com.ssafy.healingdiary.global.jwt.TokenRegenerateResponse;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
                                                 @RequestPart(value = "update", required = false) MemberUpdateRequest memberUpdateRequest,
                                                 @RequestPart(value = "image_file", required = false)MultipartFile file) throws IOException {
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return memberService.memberUpdate(principal.getPassword(),memberUpdateRequest, file);


    }

    @PostMapping("/nickname")
    public NicknameCheckResponse result (@RequestBody NicknameCheckRequest memberNickname){
        // 닉네임 조회

        return memberService.nicknameCheck(memberNickname);
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenRegenerateResponse> reissue(HttpServletRequest request) {
        return memberService.reissue(request);
    }


}
