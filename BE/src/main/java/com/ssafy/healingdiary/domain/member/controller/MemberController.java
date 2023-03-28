package com.ssafy.healingdiary.domain.member.controller;


import com.amazonaws.Response;
import com.ssafy.healingdiary.domain.member.dto.MemberInfo;
import com.ssafy.healingdiary.domain.member.service.MemberService;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<MemberInfo> memberDetailInfo(@RequestHeader(value="Authorization") String authorization){

        String accessToken = authorization.replace("Bearer ", "");

        // 사용자 조회

        MemberInfo memberInfo = memberService.getUserByProviderEmail(accessToken);

        return new ResponseEntity<>(memberInfo, HttpStatus.OK);
    }


}
