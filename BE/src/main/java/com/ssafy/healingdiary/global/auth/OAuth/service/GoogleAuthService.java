package com.ssafy.healingdiary.global.auth.OAuth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.OAuth.dto.*;
import com.ssafy.healingdiary.global.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;



@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    private RestTemplate restTemplate;
    private ObjectMapper objectMapper;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public LoginResDto googleOauthLogin(String accesstoken) throws JsonProcessingException {
        GoogleOauthTokenResDto googleOAuthResponse = this.googleOauthCheckToken(accesstoken);
        System.out.println("GoogleOAuthResponse: " + googleOAuthResponse);
        String memberEmail = "GOOGLE"+"_"+googleOAuthResponse.getEmail();
        Member foundMember = memberRepository.findMemberByProviderEmail(memberEmail);
        if (foundMember == null) {

            return LoginResDto.builder()
                    .id(null)
                    .email(googleOAuthResponse.getEmail())
                    .region(null)
                    .disease(null)
                    .nickname(null)
                    .memberImageUrl(null)
                    .jwtToken(null)
                    .build();
        }

        String jwtToken = jwtTokenizer.createAccessToken(foundMember.getProviderEmail(), foundMember.getRoleList());
        return LoginResDto.builder()
                .id(foundMember.getId())
                .email(googleOAuthResponse.getEmail())
                .region(foundMember.getRegion())
                .disease(foundMember.getDisease())
                .nickname(foundMember.getNickname())
                .memberImageUrl(foundMember.getMemberImageUrl())
                .jwtToken(jwtToken)
                .build();

    }
    public LoginResDto kakaoOauthLogin(String accesstoken) throws JsonProcessingException {
        KakaoOauthTokenResDto kakaoOauthTokenResDto = this.kakaoOauthCheckToken(accesstoken);
        System.out.println("KakaoOauthtoken: " + kakaoOauthTokenResDto);
        String memberEmail = kakaoOauthTokenResDto.getEmail();
        Member foundMember = memberRepository.findMemberByProviderEmail(memberEmail);
        if (foundMember == null) {

            return LoginResDto.builder()
                    .id(null)
                    .email(memberEmail)
                    .region(null)
                    .disease(null)
                    .nickname(null)
                    .memberImageUrl(null)
                    .jwtToken(null)
                    .build();
        }

        String jwtToken = jwtTokenizer.createAccessToken(foundMember.getProviderEmail(), foundMember.getRoleList());
        return LoginResDto.builder()
                .id(foundMember.getId())
                .email(memberEmail)
                .region(foundMember.getRegion())
                .disease(foundMember.getDisease())
                .nickname(foundMember.getNickname())
                .memberImageUrl(foundMember.getMemberImageUrl())
                .jwtToken(jwtToken)
                .build();

    }
//    public LoginResDto googleSignUp(SignupReqDto signupReqDto)
//            throws JsonProcessingException {
//
//
//    }

    public GoogleOauthTokenResDto googleOauthCheckToken(String accesstoken)
            throws JsonProcessingException {
        String GOOGLE_USERINFO_REQUEST_URL = "https://www.googleapis.com/userinfo/v2/me";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accesstoken);
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                GOOGLE_USERINFO_REQUEST_URL,
                HttpMethod.GET,
                request,
                String.class
        );
        return objectMapper.readValue(response.getBody(), GoogleOauthTokenResDto.class);
    }
    public KakaoOauthTokenResDto kakaoOauthCheckToken(String accessToken)
            throws JsonProcessingException {
        String KAKAO_USERINFO_REQUEST_URL = "https://kapi.kakao.com/v1/user/access_token_info";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        HttpEntity request = new HttpEntity(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                KAKAO_USERINFO_REQUEST_URL,
                HttpMethod.GET,
                request,
                String.class
        );
        return objectMapper.readValue(response.getBody(), KakaoOauthTokenResDto.class);
    }

}
