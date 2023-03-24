package com.ssafy.healingdiary.global.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

@Getter
@Component
public class JwtTokenizer {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration-accesstoken-minutes}")
    private int accesstokenExpiration;

    @Value("${jwt.expiration-refreshtoken-minutes}")
    private int refreshtokenExpiration;


    public String encodeBase64SecretKey(String secretKey) {
        return Encoders.BASE64.encode(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    //jwt 엑세스토큰 생성 메서드
    public String createAccessToken(Map<String, Object> claims,
                                    String subject,
                                    Date expiration,
                                    String encodedSecretKey) {
        Key key = getKeyFromEncodedKey(encodedSecretKey);
        return Jwts.builder()
                .setClaims(claims) // claims는 사용자와 관련된 정보가 들어가있는 Map
                .setSubject(subject) // Jwt토큰의 제목
                .setIssuedAt(Calendar.getInstance().getTime()) // 발행일자
                .setExpiration(expiration) // 만기일자
                .signWith(key) // 시크릿키로 서명하기
                .compact(); // jwt토큰 만들기
    }

    // JWT토큰에는 서명이 들어간다. 그곳에 들어갈 서명을 생성해주는 메서드
    public Key getKeyFromEncodedKey(String encodedSecretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(encodedSecretKey);
        Key key = Keys.hmacShaKeyFor(keyBytes);

        return key;
    }

    // 리프레쉬 토큰 생성 메서드
    public String createRefreshToken(String subject, Date expiration, String encodedSecretkey) {
        Key key = getKeyFromEncodedKey(encodedSecretkey);

        return Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(Calendar.getInstance().getTime())
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    // 서명 검증
    public void verifySignature(String jws, // jws는 signature가 들어간 jwt라는 의미
                                String encodedSecretKey) {
        Key key = getKeyFromEncodedKey(encodedSecretKey);

        Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
    }

    // jws안에 있는 Claims얻는 메서드
    public Jws<Claims> getClaims(String jws, String encodedSecretKey) {
        Key key = getKeyFromEncodedKey(encodedSecretKey);

        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(jws);
        return claims;
    }

    // 토큰만기시간 받는 메서드
    public Date getTokenExpiration(Integer expirationminutes) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.MINUTE, expirationminutes); // 현재 시간에서 토큰 만기 시간만큼 추가해서 저장됨
        Date expirationTime = calendar.getTime();
        return expirationTime;
    }




}
