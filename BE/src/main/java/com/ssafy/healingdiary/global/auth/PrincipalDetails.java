package com.ssafy.healingdiary.global.auth;

import com.ssafy.healingdiary.domain.member.domain.Member;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.stream.Collectors;

@Component
public class PrincipalDetails implements UserDetails {

    private Member member;

    public PrincipalDetails(Member member) {
        this.member = member;
    }


    @Override
    public String getUsername() {
        return member.getNickname();
    }

    @Override
    public String getPassword() {
        return member.getProviderEmail();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return member.getRoleList().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
