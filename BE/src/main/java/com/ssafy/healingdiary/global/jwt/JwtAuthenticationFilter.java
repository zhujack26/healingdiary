package com.ssafy.healingdiary.global.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import com.ssafy.healingdiary.global.redis.RedisUtil;
import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final PrincipalDetailsService principalDetailsService;

    private final JwtTokenizer jwtTokenizer;


    private final RedisTemplate redisTemplate;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            String path = request.getServletPath();
            if (path.endsWith("reissue")) {
                filterChain.doFilter(request, response);
            }
            else{
                String token = request.getHeader("Authorization").replace("Bearer ", "");
                boolean isTokenValid = jwtTokenizer.validateToken(token);
                if (StringUtils.hasText(token) && isTokenValid) {
                    String memberId = jwtTokenizer.getUsernameFromToken(token);
                    String isLogout = (String) redisTemplate.opsForValue().get(memberId);
                    if (ObjectUtils.isEmpty(isLogout)) {
                        Authentication authentication = principalDetailsService.getAuthentication(token);
                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
                filterChain.doFilter(request, response);
            }
        }
        catch(ExpiredJwtException e){
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType("application/json;charset=UTF-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(TokenResponse.reissue()));
            response.getWriter().flush();
            response.getWriter().close();

        }

    }
}