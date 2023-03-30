package com.ssafy.healingdiary.global.jwt;

import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


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
            //리프레시토큰을 조회
            logger.error("만료난 토큰");
            Cookie[] cookies = request.getCookies();
            String refreshToken = null;

            if (cookies != null) {
                for (Cookie cookie : cookies) {
                    if ("refreshToken".equals(cookie.getName())) {
                        break;
                    }
                }
                if(refreshToken != null){
                    response.setStatus(ErrorCode.NOT_FOUND_REFRESHTOKEN.getStatus().value());
                    ResponseEntity nullRefreshToken = ResponseEntity
                            .status(ErrorCode.NOT_FOUND_REFRESHTOKEN.getStatus().value())
                            .body(new ErrorResponse(ErrorCode.NOT_FOUND_REFRESHTOKEN));
                    ObjectMapper om = new ObjectMapper();
                    String result = om.writeValueAsString(nullRefreshToken);
                    response.getWriter().write(result);

                }
        }


        filterChain.doFilter(request, response);
    }
}