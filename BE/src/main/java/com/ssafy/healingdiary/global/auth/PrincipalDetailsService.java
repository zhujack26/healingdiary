package com.ssafy.healingdiary.global.auth;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.auth.OAuth.repository.OAuthRepository;
import com.ssafy.healingdiary.global.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

import static com.ssafy.healingdiary.global.error.ErrorCode.ENTITY_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final OAuthRepository oAuthRepository;

    private final JwtTokenizer jwtTokenizer;


    @Override
    public PrincipalDetails loadUserByUsername(String provider_email) throws EntityNotFoundException {

        Member member = oAuthRepository.findByProviderEmail(provider_email);

        return new PrincipalDetails(member);
    }

    public PrincipalDetails loadMemberByAccessToken(String accessToken) throws EntityNotFoundException {
        System.out.println("PrincipalDetailsService : 진입");
        String provider_email = jwtTokenizer.getUsernameFromToken(accessToken);
        Member member = oAuthRepository.findByProviderEmail(provider_email);
        System.out.println(member);
        return new PrincipalDetails(member);
    }
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.loadUserByUsername(jwtTokenizer.getEmail(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}
