package com.ssafy.healingdiary.domain.member.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.healingdiary.domain.member.dto.KakaoOAuthTokenReqDto;
import com.ssafy.healingdiary.domain.member.dto.LoginResDto;
import com.ssafy.healingdiary.domain.member.dto.SignupReqDto;
import com.ssafy.healingdiary.domain.member.service.OAuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("/auth/account/kakao")
@Slf4j
public class OAuthKakaoController {
    private final OAuthService oAuthService;


    //카카오 토큰 체크 컨트롤러
    @PostMapping("/login")
    public ResponseEntity<LoginResDto> checkOauthToken(@RequestBody KakaoOAuthTokenReqDto kakaoOAuthTokenReqDto) {
        System.out.println(kakaoOAuthTokenReqDto);
        try {
            //소셜로그인 에 따라서 oAuthLogin을 하자!
            LoginResDto loginResDto = oAuthService.kakaoOAuthLogin(kakaoOAuthTokenReqDto);
            return new ResponseEntity<>(loginResDto, HttpStatus.OK);
        }catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResDto> signupOauthToken(@RequestBody SignupReqDto signupReqDto) {
        System.out.println(signupReqDto);
        try {
            //소셜로그인 에 따라서 oAuthLogin을 하자!
            LoginResDto loginResDto = oAuthService.kakaoOAuthSignup(signupReqDto);
            return new ResponseEntity<>(loginResDto, HttpStatus.OK);
        }catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }
    @GetMapping("/exception")
    public void exceptionTest() throws RuntimeException {
        throw new RuntimeException("접근이 금지되었습니다.");
    }
}
