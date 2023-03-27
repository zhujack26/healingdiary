package com.ssafy.healingdiary.global.auth.OAuth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.healingdiary.global.auth.OAuth.dto.GoogleOauthTokenReqDto;
import com.ssafy.healingdiary.global.auth.OAuth.dto.GoogleOauthTokenResDto;
import com.ssafy.healingdiary.global.auth.OAuth.dto.LoginResDto;
import com.ssafy.healingdiary.global.auth.OAuth.dto.SignupReqDto;
import com.ssafy.healingdiary.global.auth.OAuth.service.GoogleAuthService;
import com.ssafy.healingdiary.global.jwt.JwtTokenizer;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
@RequestMapping("/auth/account/")
@Slf4j
public class OAuthController {


    private final GoogleAuthService googleAuthService;
    private final JwtTokenizer jwtTokenizer;
    private final OAuthService oauthService;

    @ApiOperation(value = "구글 로그인", notes = "구글 엑세스 토큰을 이용하여 사용자 정보 받아 저장하고 앱의 토큰 반환해줌")
    @GetMapping(value = "/google")
    public ResponseEntity<LoginResDto> googleAuthRequest(@RequestHeader("Authorization") String accessToken) {
        String oauthAcessToken = accessToken.replace("Bearer ", "");
        try {
            LoginResDto loginResDto = googleAuthService.googleOauthLogin(oauthAcessToken);
            return new ResponseEntity<>(loginResDto, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    @ApiOperation(value = "카카오 로그인", notes = "카카오 엑세스 토큰을 이용해서 사용자 정보 받아 저장하고 앱의 토큰 반환해줌")
    @GetMapping(value = "/kakao")
    public ResponseEntity<GoogleOauthTokenResDto> kakaoAuthRequest(@RequestBody GoogleOauthTokenReqDto googleOauthTokenReqDto) {
        try {
            GoogleOauthTokenResDto googleoauthTokenResDto = KakaoAuthService.kakaoOauthLogin(googleOauthTokenReqDto);
            return new ResponseEntity<>(googleoauthTokenResDto, HttpStatus.OK);
        } catch (JsonProcessingException e) {
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


//    @ApiOperation(value = "appToken 갱신", notes = "appToken 갱신")
//    @GetMapping("/refresh")
//    public ResponseEntity<OAuthTokenResDto> refreshToken (HttpServletRequest request) {
//        String jwtToken = JwtHeaderUtil.getAccessToken(request);
//        AuthToken authToken = JwtTokenizer.convertAuthToken(jwtToken);
//        if (!authToken.validate()) { // 형식에 맞지 않는 token
//            return null; // body에 담은 것 없이, 403 HTTP code return
//        }
//
//        OAuthTokenResDto oAuthTokenResDto = OAuthService.updateToken(authToken);
//        if (oAuthTokenResDto == null) { // token 만료
//            return null;
//        }
//        return oAuthTokenResDto;
//    }

}

