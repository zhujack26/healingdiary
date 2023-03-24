package com.ssafy.healingdiary.global.jwt;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.OAuth.dto.OAuthTokenReqDto;
import com.ssafy.healingdiary.global.auth.OAuth.dto.OAuthTokenResDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KakaoAuthService {
    private final ClientKakao clientKakao;
    private final JwtTokenizer jwtTokenizer;
    private final MemberRepository memberRepository;

    public OAuthTokenResDto login(OAuthTokenReqDto oAuthTokenReqDto) {
        Member kakaoMember = clientKakao; // userData 담기
        // Members googleMember = clientGoogle.getUserData(authRequest.getAccessToken());
        String email = kakaoMember.
        // String socialId = googleMember.getSocialId();
        Members member = memberQuerydslRepository.findBySocialId(socialId);

        AuthToken appToken = authTokenProvider.createUserAppToken(socialId); // 신규 토큰 생성

        if (member == null) {
            memberRepository.save(kakaoMember);
            // memberRepository.save(googleMember);
        }

        return AuthResponse.builder() // /auth/kakao와 /auth/google의 응답의 body로 AccessToken(AppToken)을 보내주기위해 builder 사용
                .appToken(appToken.getToken())
                .build();
    }

}
