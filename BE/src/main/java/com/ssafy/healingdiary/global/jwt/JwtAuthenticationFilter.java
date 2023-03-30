package com.ssafy.healingdiary.global.jwt;

import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final PrincipalDetailsService principalDetailsService;

    private final JwtTokenizer jwtTokenizer;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        System.out.println("asdfasdf나왓어");

        if (token != null && jwtTokenizer.validateToken(token)) {
            System.out.println("asdf토큰 검정끝");
            Authentication authentication = principalDetailsService.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        else if(!jwtTokenizer.validateToken(token)){

        }


        filterChain.doFilter(request, response);
    }
}