package com.ssafy.healingdiary.global.auth.OAuth.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.OAuth.dto.*;
import com.ssafy.healingdiary.global.error.CustomException;
import com.ssafy.healingdiary.global.error.ErrorCode;
import com.ssafy.healingdiary.global.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

import static com.ssafy.healingdiary.global.error.ErrorCode.NOT_VALID_TOKEN;


@Service
@RequiredArgsConstructor
public class OauthService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public LoginResDto googleOauthLogin(String accesstoken) throws JsonProcessingException {
        GoogleOauthTokenResDto googleOAuthResponse = this.googleOauthCheckToken(accesstoken);
        System.out.println("GoogleOAuthResponse: " + googleOAuthResponse);
        String memberEmail = "GOOGLE_" + googleOAuthResponse.getEmail();
        Member foundMember = memberRepository.findMemberByProviderEmail(memberEmail);
        if (foundMember == null) {
            throw new CustomException(ErrorCode.NOT_FOUND_USER);
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
        String memberEmail = "KAKAO_" + kakaoOauthTokenResDto.getKakaoOauthTokenResAccount().getEmail();
        Member foundMember = memberRepository.findMemberByProviderEmail(memberEmail);
        if (foundMember == null) {
            throw new CustomException(ErrorCode.NOT_FOUND_USER);
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
    public LoginResDto googleSignUp(String accesstoken, SignupReqDto signupReqDto)
            throws JsonProcessingException {
        GoogleOauthTokenResDto googleOauthTokenResDto = this.googleOauthCheckToken(accesstoken);
        String providerEmail = "GOOGLE_" + googleOauthTokenResDto.getEmail();
        Member duplicatedMember = memberRepository.findMemberByProviderEmail(providerEmail);
        if (duplicatedMember != null) {
            throw new CustomException(ErrorCode.CONFLICT);
        }
        Member newMember = Member.builder()
                .providerEmail(providerEmail)
                .nickname(signupReqDto.getNickname())
                .region(signupReqDto.getRegion())
                .disease(signupReqDto.getDisease())
                .memberImageUrl(googleOauthTokenResDto.getPicture())
                .roles("USER")
                .build();
        Member saveUser = memberRepository.save(newMember);

        String jwt = jwtTokenizer.createAccessToken(newMember.getProviderEmail(), newMember.getRoleList());

        return LoginResDto.builder()
                .id(saveUser.getId())
                .nickname(saveUser.getNickname())
                .memberImageUrl(saveUser.getMemberImageUrl())
                .region(saveUser.getRegion())
                .disease(saveUser.getDisease())
                .email(saveUser.getProviderEmail())
                .jwtToken(jwt)
                .build();
    }
    public LoginResDto kakaoSignup(String accesstoken, SignupReqDto signupReqDto)
            throws JsonProcessingException {
        KakaoOauthTokenResDto kakaoOauthTokenResDto = this.kakaoOauthCheckToken(accesstoken);
        String providerEmail = "KAKAO_" + kakaoOauthTokenResDto.getKakaoOauthTokenResAccount().getEmail();

        Member duplicatedMember = memberRepository.findMemberByProviderEmail(providerEmail);
        if (duplicatedMember != null) {
            throw new CustomException(ErrorCode.CONFLICT);
        }
        Member newMember = Member.builder()
                .providerEmail(providerEmail)
                .nickname(signupReqDto.getNickname())
                .region(signupReqDto.getRegion())
                .disease(signupReqDto.getDisease())
                .memberImageUrl(kakaoOauthTokenResDto.getKakaoOauthTokenResProperties().getProfileImage())
                .roles("USER")
                .build();
        Member saveUser = memberRepository.save(newMember);

        String jwt = jwtTokenizer.createAccessToken(saveUser.getProviderEmail(), saveUser.getRoleList());

        return LoginResDto.builder()
                .id(saveUser.getId())
                .nickname(saveUser.getNickname())
                .memberImageUrl(saveUser.getMemberImageUrl())
                .region(saveUser.getRegion())
                .disease(saveUser.getDisease())
                .email(saveUser.getProviderEmail())
                .jwtToken(jwt)
                .build();
    }

    public GoogleOauthTokenResDto googleOauthCheckToken(String accesstoken)
            throws JsonProcessingException {
        String GOOGLE_USERINFO_REQUEST_URL = "https://www.googleapis.com/userinfo/v2/me";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accesstoken);
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
        String KAKAO_USERINFO_REQUEST_URL = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", accessToken);
        HttpEntity request = new HttpEntity(headers);
        System.out.println("hi");
        ResponseEntity<String> response = restTemplate.exchange(
                KAKAO_USERINFO_REQUEST_URL,
                HttpMethod.GET,
                request,
                String.class
        );
        return objectMapper.readValue(response.getBody(), KakaoOauthTokenResDto.class);
    }

}
