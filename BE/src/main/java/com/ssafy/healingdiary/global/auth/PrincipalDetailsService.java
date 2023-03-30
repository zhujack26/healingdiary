package com.ssafy.healingdiary.global.auth;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.auth.OAuth.repository.OAuthRepository;
import com.ssafy.healingdiary.global.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import static com.ssafy.healingdiary.global.error.ErrorCode.ENTITY_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private static final String AUTHORITIES_KEY = "sub";

    private final OAuthRepository oAuthRepository;

    private final JwtTokenizer jwtTokenizer;


    @Override
    public PrincipalDetails loadUserByUsername(String id) throws EntityNotFoundException {
        Long Pid = Long.parseLong(id);
        Member member = oAuthRepository.findById(Pid);

        return new PrincipalDetails(member);
    }


    public Authentication getAuthentication(String token) {
        Claims claims = jwtTokenizer.parseClaims(token);

        if (claims.get(AUTHORITIES_KEY) == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        UserDetails userDetails = this.loadUserByUsername(jwtTokenizer.getId(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

}
