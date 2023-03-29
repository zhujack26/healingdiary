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
    public PrincipalDetails loadUserByUsername(String id) throws EntityNotFoundException {
        Long Pid = Long.parseLong(id);
        Member member = oAuthRepository.findById(Pid);

        return new PrincipalDetails(member);
    }

    public PrincipalDetails loadMemberByAccessToken(String accessToken) throws EntityNotFoundException {
        System.out.println("PrincipalDetailsService : 진입");
        String id = jwtTokenizer.getUsernameFromToken(accessToken);
        Long Pid = Long.parseLong(id);
        Member member = oAuthRepository.findById(Pid);
        System.out.println(member);
        return new PrincipalDetails(member);
    }
    public Authentication getAuthentication(String token) {
        UserDetails userDetails = this.loadUserByUsername(jwtTokenizer.getId(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }
}
