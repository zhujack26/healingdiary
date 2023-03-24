package com.ssafy.healingdiary.global.auth.OAuth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.healingdiary.global.auth.OAuth.dto.OAuthTokenReqDto;
import com.ssafy.healingdiary.global.auth.OAuth.dto.LoginResDto;
import com.ssafy.healingdiary.global.auth.OAuth.dto.OAuthTokenResDto;
import com.ssafy.healingdiary.global.auth.OAuth.dto.SignupReqDto;
import com.ssafy.healingdiary.global.auth.OAuth.service.OAuthService;
import com.ssafy.healingdiary.global.jwt.JwtTokenizer;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@Controller
@RequestMapping("/auth/account/")
@Slf4j
public class OAuthGoogleController {

    private final KakaoAuthService kakaoAuthService;
    private final GoogleAuthService googleAuthService;
    private final JwtTokenizer jwtTokenizer;
    private final OAuthService oauthService;

    @ApiOperation(value = "구글 로그인", notes = "구글 엑세스 토큰을 이용하여 사용자 정보 받아 저장하고 앱의 토큰 반환해줌")
    @PostMapping(value = "/google")
    public ResponseEntity<OAuthTokenResDto> googleAuthRequest(@RequestBody OAuthTokenReqDto oAuthTokenReqDto) {

        return googleAuthService.login(oAuthTokenReqDto); // body에 jwtToken 반환(response code 200)
    }

    @ApiOperation(value = "카카오 로그인", notes = "카카오 엑세스 토큰을 이용해서 사용자 정보 받아 저장하고 앱의 토큰 반환해줌")
    @PostMapping(value = "/kakao")
    public ResponseEntity<OAuthTokenResDto> kakaoAuthRequest(@RequestBody OAuthTokenReqDto oAuthTokenReqDto) {
        return kakaoAuthService.login(oAuthTokenReqDto); // body에 jwtToken 반환(response code 200)
    }

    @ApiOperation(value = "appToken 갱신", notes = "appToken 갱신")
    @GetMapping("/refresh")
    public ResponseEntity<OAuthTokenResDto> refreshToken (HttpServletRequest request) {
        String jwtToken = JwtHeaderUtil.getAccessToken(request);
        AuthToken authToken = JwtTokenizer.convertAuthToken(jwtToken);
        if (!authToken.validate()) { // 형식에 맞지 않는 token
            return null; // body에 담은 것 없이, 403 HTTP code return
        }

        OAuthTokenResDto oAuthTokenResDto = OAuthService.updateToken(authToken);
        if (oAuthTokenResDto == null) { // token 만료
            return null;
        }
        return oAuthTokenResDto;
    }

}

