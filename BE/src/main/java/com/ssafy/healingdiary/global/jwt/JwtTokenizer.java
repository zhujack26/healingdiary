package com.ssafy.healingdiary.global.jwt;

import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;


@Getter
@Component
@Service
@RequiredArgsConstructor
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
    public String createAccessToken(String id, List<String> roleList) {
        Key key = getKeyFromEncodedKey(encodeBase64SecretKey(this.secretKey));
        Claims claims = Jwts.claims().setSubject(id);
        claims.put("roles", roleList);
        System.out.println(claims);
        Date currenttime = new Date();
        Date expiration = this.getTokenExpiration(this.accesstokenExpiration);
        System.out.println("currenttime:" + currenttime);
        System.out.println("expiration:" + expiration);
        return Jwts.builder()
                .setClaims(claims) // claims는 사용자와 관련된 정보가 들어가있는 Map
                .setIssuedAt(currenttime) // 발행일자
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
    public String createRefreshToken(String id, List<String> roleList) {
        Key key = getKeyFromEncodedKey(encodeBase64SecretKey(this.secretKey));
        Claims claims = Jwts.claims().setSubject(id);
        claims.put("roles", roleList);

        Date currenttime = new Date();
        Date expiration = this.getTokenExpiration(this.refreshtokenExpiration);
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(currenttime)
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
    public Jws<Claims> getClaims(String jws) {
        Key key = getKeyFromEncodedKey(encodeBase64SecretKey(secretKey));

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

    public String getId(String token) {
        String id = Jwts.parserBuilder().setSigningKey(encodeBase64SecretKey(secretKey)).build().parseClaimsJws(token).getBody().getSubject();
        System.out.println(id);
        return id;
    }
    public String getUsernameFromToken(String token) {
        Jws<Claims>  claims = getClaims(token);
        Claims claim = claims.getBody();
        String id = claim.get("sub", String.class);

        return id;
    }
    public boolean validateToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return !claims.getBody().getExpiration().before(new Date());
        }catch (SignatureException e) {
            //쿠키에 있는 리프레시토큰 가져오기
            System.out.println("이상한 jwt");
            e.printStackTrace();
            return false;
        }
        catch (Exception e) {
            return false;
        }
    }



}
