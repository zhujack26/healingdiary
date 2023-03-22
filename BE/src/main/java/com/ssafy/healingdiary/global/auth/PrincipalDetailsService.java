package com.ssafy.healingdiary.global.auth;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.repository.OAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

    private final OAuthRepository oAuthRepository;

    @Override
    public UserDetails loadUserByUsername(String provider_email) throws UsernameNotFoundException {
        System.out.println("PrincipalDetailsService : 진입");
        Member member = oAuthRepository.findByProviderEmail(provider_email);
        System.out.println(member);
        return new PrincipalDetails(member);
    }
}
