package com.ssafy.healingdiary.global.jwt;

import com.ssafy.healingdiary.domain.member.dto.LoginResponse;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Service
public class CookieUtil {

    public ResponseEntity<LoginResponse> HandlerMethod(String refreshToken, LoginResponse loginResponse){
        ResponseCookie cookie = ResponseCookie.from("refreshToken", refreshToken)
                .maxAge(7 * 24 * 60 * 60) // 쿠키 유효기간 설정 (초 단위)
                .path("/") // 쿠키의 경로 설정
                .secure(true) // HTTPS에서만 쿠키를 전송하도록 설정
                .sameSite("None") // SameSite 설정
                .httpOnly(true) // JavaScript에서 쿠키에 접근하지 못하도록 설정
                .build();
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
        response.setHeader("Set-Cookie", cookie.toString());

        return ResponseEntity.ok(loginResponse);
    }
}
