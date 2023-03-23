package com.ssafy.healingdiary.global.jwt;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

public class JwtTokenizer {

    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public String createAccessToken(Map<String, Object> claims,
                                    String subject,
                                    Date expiration,
                                    String encodedSecretKey) {
        Key key = getKeyFromBase64EncodedKey(encodedSecretKey);
        return Jwts.builder()
                .setClaims(claims) // claims는 사용자와 관련된 정보가 들어가있는 Map
                .setSubject(subject) // Jwt토큰의 제목
                .setIssuedAt(Calendar.getInstance().getTime()) // 발행일자
                .setExpiration(expiration) // 만기일자
                .signWith(key) // 시크릿키로 서명하기
                .compact(); // jwt토큰 만들기
    }

    // JWT토큰에는 서명이 들어간다. 그곳에 들어갈 서명을 생성해주는 메서드
    public Key getKeyFromBase64EncodedKey(String encodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(encodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    public String createRefreshToken(String subject, Date expiration, String encodedSecretkey) {
        Key key = getKeyFromBase64EncodedKey(encodedSecretkey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }


}