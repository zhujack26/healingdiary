package com.ssafy.healingdiary.global.auth.OAuth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.auth.OAuth.dto.*;
import com.ssafy.healingdiary.global.auth.OAuth.repository.OAuthRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class OAuthService {

    private final RestTemplate restTemplate;

    private final ObjectMapper objectMapper;
    private final OAuthRepository oAuthRepository;

    public LoginResDto googleOAuthLogin(GoogleOAuthTokenReqDto googleOAuthTokenReqDto) throws JsonProcessingException {

        // 소셜과 Dto로 사용자 정보 가지고 와서 디비에 있는지 확인하는 로직.
        GoogleOAuthTokenResDto oAuthResponse = this.googleOAuthTokenCheck(googleOAuthTokenReqDto);
        // 사용자 이메일을 가져온다
        String userEmail = oAuthResponse.getEmail();
        Member foundUser = oAuthRepository.findByProviderEmail("GOOGLE"+"_"+userEmail);

        if(foundUser == null){
            return new LoginResDto(null, null,null, null, null, null, null);
        }
        //jwt토큰 만들어 내야함.
//                    String jwtToken = jwtToken
        //더미 jwtToken
        String jwtToken = "jwtToken더미";
        return new LoginResDto(foundUser.getId(),foundUser.getNickname(), userEmail ,foundUser.getRegion(), foundUser.getDisease(), foundUser.getMemberImageUrl(), jwtToken);
    }
    public LoginResDto kakaoOAuthLogin(KakaoOAuthTokenReqDto kakaoOAuthTokenReqDto) throws JsonProcessingException {

        // 소셜과 Dto로 사용자 정보 가지고 와서 디비에 있는지 확인하는 로직
        KakaoOAuthTokenResDto oAuthResponse = this.kakaoOAuthTokenCheck(kakaoOAuthTokenReqDto);
        // 사용자 이메일을 가져온다.
        String userEmail = oAuthResponse.getEmail();
        Member foundUser = oAuthRepository.findByProviderEmail("KAKAO"+"_"+userEmail);

        if(foundUser == null){
            return new LoginResDto(null,null, null, null, null, null, null);
        }
        //jwt토큰 만들어 내야함.
//                    String jwtToken = jwtToken
        //더미 jwtToken
        String jwtToken = "jwtToken더미";
        return new LoginResDto(foundUser.getId(), foundUser.getNickname(),userEmail, foundUser.getRegion(), foundUser.getDisease(), foundUser.getMemberImageUrl(), jwtToken);

    }


    // 토큰 유효한 지 검사하고 유효하면 사용자 정보를 가져오는 거까지 함.
    // 구글 토큰인증 -> 구글 사용자 정보까지 받아옴
    public GoogleOAuthTokenResDto googleOAuthTokenCheck (GoogleOAuthTokenReqDto googleOAuthTokenReqDto) throws JsonProcessingException {
        String GOOGLE_USERINFO_REQUEST_URL = "https://www.googleapis.com/oauth2/v1/userinfo";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + googleOAuthTokenReqDto.getAccessToken());
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                GOOGLE_USERINFO_REQUEST_URL,
                HttpMethod.GET,
                request,
                String.class
        );
        return objectMapper.readValue(response.getBody(), GoogleOAuthTokenResDto.class);

    }


    //카카오 토큰인증 -> 카카오 사용자 정보까지 받아옴
    public KakaoOAuthTokenResDto kakaoOAuthTokenCheck (KakaoOAuthTokenReqDto kakaoOAuthTokenReqDto) throws JsonProcessingException {
        String KAKAO_USERINFO_REQUEST_URL = "kakao요청";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + kakaoOAuthTokenReqDto.getAccessToken());
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                KAKAO_USERINFO_REQUEST_URL,
                HttpMethod.GET,
                request,
                String.class
        );
        return objectMapper.readValue(response.getBody(), KakaoOAuthTokenResDto.class);

    }

    public LoginResDto googleOAuthSignup (SignupReqDto signupReqDto) throws JsonProcessingException {
        GoogleOAuthTokenResDto oAuthResponse = this.googleOAuthTokenCheck(signupReqDto.getGoogleTokenInfo());
        System.out.println(oAuthResponse    );

        if (oAuthResponse == null) {
            return new LoginResDto(null,null, null, null, null, null, null);
        }
        String userEmail = oAuthResponse.getEmail();

        Member newMember = Member.builder()
                .providerEmail("GOOGLE" + "_" + signupReqDto.getUserInfo().getEmail())
                .nickname(signupReqDto.getUserInfo().getNickname())
                .region(signupReqDto.getUserInfo().getRegion())
                .disease(signupReqDto.getUserInfo().getDisease())
                .memberImageUrl(signupReqDto.getUserInfo().getMemberImageUrl())
                .build();
        Member savedUser = oAuthRepository.save(newMember);

        //jwt토큰 만들어줘용
        //String jwtToken = jwtTokenProvider.createToken(savedUser.getEmail(), savedUser.getRoleList());
        String jwtToken = "jwtToken더미";

        LoginResDto loginResDto = new LoginResDto(savedUser.getId(), savedUser.getNickname(),userEmail, savedUser.getRegion(), savedUser.getDisease(), savedUser.getMemberImageUrl(), jwtToken);
        System.out.println(loginResDto);
        return loginResDto;


    }

    public LoginResDto kakaoOAuthSignup (SignupReqDto signupReqDto) throws JsonProcessingException {
        KakaoOAuthTokenResDto oAuthResponse = this.kakaoOAuthTokenCheck(signupReqDto.getKakaoTokenInfo());

        if (oAuthResponse == null) {
            return new LoginResDto(null, null, null, null, null, null,null);
        }
        String userEmail = oAuthResponse.getEmail();
        Member newMember = Member.builder()
                .providerEmail("KAKAO" + "_" + signupReqDto.getUserInfo().getEmail())
                .nickname(signupReqDto.getUserInfo().getNickname())
                .region(signupReqDto.getUserInfo().getRegion())
                .disease(signupReqDto.getUserInfo().getDisease())
                .memberImageUrl(signupReqDto.getUserInfo().getMemberImageUrl())
                .build();
        Member savedUser = oAuthRepository.save(newMember);

        //jwt토큰 만들어줘용
        //String jwtToken = jwtTokenProvider.createToken(savedUser.getEmail(), savedUser.getRoleList());
        String jwtToken = "jwtToken더미";
        LoginResDto loginResDto = new LoginResDto(savedUser.getId(), savedUser.getNickname(),userEmail , savedUser.getRegion(), savedUser.getDisease(), savedUser.getMemberImageUrl(), jwtToken);
        System.out.println(loginResDto);
        return loginResDto;

    }
}