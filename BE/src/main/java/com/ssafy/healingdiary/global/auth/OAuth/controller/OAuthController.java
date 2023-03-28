package com.ssafy.healingdiary.global.auth.OAuth.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.healingdiary.global.auth.OAuth.dto.*;
import com.ssafy.healingdiary.global.auth.OAuth.service.OauthService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Controller
@RequestMapping("/auth/account")
@Slf4j
public class OAuthController {

    private final OauthService oauthService;

    @ApiOperation(value = "구글 로그인", notes = "구글 엑세스 토큰을 이용하여 사용자 정보 받아 저장하고 앱의 토큰 반환해줌")
    @GetMapping(value = "/google/login")
    public ResponseEntity<LoginResDto> googleAuthRequest(@RequestHeader("Authorization") String accessToken) {

        try {
            LoginResDto loginResDto = oauthService.googleOauthLogin(accessToken);
            return new ResponseEntity<>(loginResDto, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

    @ApiOperation(value = "카카오 로그인", notes = "카카오 엑세스 토큰을 이용해서 사용자 정보 받아 저장하고 앱의 토큰 반환해줌")
    @GetMapping(value = "/kakao/login")
    public ResponseEntity<LoginResDto> kakaoAuthRequest(@RequestHeader("Authorization") String accessToken) {

        try {
            LoginResDto loginResDto = oauthService.kakaoOauthLogin(accessToken);
            return new ResponseEntity<>(loginResDto, HttpStatus.OK);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;

    }
    @ApiOperation(value = "회원가입", notes = "회원가입, 어떤 소셜 회원가입인지 넣어주는 것이 중요함")
    @PostMapping("/signup")
    public ResponseEntity<LoginResDto> googleSignUp(@RequestHeader("Authorization") String accessToken,
                                                    @RequestBody SignupReqDto signupReqDto) {
        try {
            LoginResDto loginResDto = oauthService.signUp(accessToken, signupReqDto);
            return new ResponseEntity<>(loginResDto, HttpStatus.OK);
        }catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

//    @PostMapping("/kakao/signup")
//    public ResponseEntity<LoginResDto> kakaoSignUp(@RequestHeader("Authorization") String accessToken,
//                                                   @RequestBody SignupReqDto signupReqDto) {
//        try {
//            //소셜로그인에 따라 회원가입을 하자
//            LoginResDto loginResDto = oauthService.kakaoSignup(accessToken, signupReqDto);
//
//            return new ResponseEntity<>(loginResDto, HttpStatus.OK);
//        }catch (JsonProcessingException e) {
//            e.printStackTrace();
//        }
//        return null;
//    }

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

