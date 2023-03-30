package com.ssafy.healingdiary.domain.member.service;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.*;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import com.ssafy.healingdiary.global.error.CustomException;
import com.ssafy.healingdiary.infra.storage.S3StorageClient;
import com.ssafy.healingdiary.global.error.ErrorCode;
import com.ssafy.healingdiary.global.error.ErrorResponse;
import com.ssafy.healingdiary.global.jwt.CookieUtil;
import com.ssafy.healingdiary.global.jwt.JwtTokenizer;
import com.ssafy.healingdiary.global.jwt.TokenRegenerateRequest;
import com.ssafy.healingdiary.global.jwt.TokenRegenerateResponse;
import com.ssafy.healingdiary.global.redis.RedisUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.TimeUnit;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.ssafy.healingdiary.global.error.ErrorCode.*;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final S3StorageClient s3Service;

    private final MemberRepository memberRepository;

    private final JwtTokenizer jwtTokenizer;



    private final RedisUtil redisUtil;

    private final CookieUtil cookieUtil;



    public MemberInfoResponse memberInfoFind(String providerEmail) {
        Member member = memberRepository.findMemberByProviderEmail(providerEmail);
        if(member == null){
            throw new CustomException(MEMBER_NOT_FOUND);
        }

        MemberInfoResponse foundMember =  MemberInfoResponse.of(member);

        return foundMember;
    }


    public MemberUpdateResponse memberUpdate(String providerEmail, MemberUpdateRequest memberUpdateRequest,
                                             MultipartFile file) throws IOException {
        Member member = memberRepository.findMemberByProviderEmail(providerEmail);

        if(member == null){
            throw new CustomException(MEMBER_NOT_FOUND);
        }
        String preImg = memberUpdateRequest.getImageUrl();
        String imageUrl = null;
        if (file != null) {
            s3Service.deleteFile(preImg);
            imageUrl = s3Service.uploadFile(file);
        } else if (memberUpdateRequest.getImageUrl() == null) {
            s3Service.deleteFile(preImg);
        } else {
            imageUrl = memberUpdateRequest.getImageUrl();
        }

        member.updateMember(memberUpdateRequest, imageUrl);
        MemberUpdateResponse foundMember =  MemberUpdateResponse.of(member);

        return foundMember;
    }

    public NicknameCheckResponse nicknameCheck(NicknameCheckRequest nickname) {
        Member member = memberRepository.findMemberByNickname(nickname.getNickname());
        if(member == null){
            NicknameCheckResponse foundMember =  NicknameCheckResponse.of(false);
            return foundMember;
        }
        else{
            NicknameCheckResponse foundMember =  NicknameCheckResponse.of(true);
            System.out.println(foundMember);
            return foundMember;
        }

    }

    public ResponseEntity<?> reissue(String tokenRegenerateRequest, HttpServletRequest request

    ) {
        String token = tokenRegenerateRequest.replace("Bearer ", "");

        //refreshToken얻어오는 방법
        Cookie[] cookies = request.getCookies();

        String refreshTokenCookie = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshTokenCookie = cookie.getValue();
                    break;
                }
            }

            if(refreshTokenCookie == null){
                throw new CustomException(BAD_REQUEST);
            }
            if(!jwtTokenizer.validateToken(refreshTokenCookie)){
                throw new CustomException(BAD_REQUEST);
            }
        }
        else{
            throw new CustomException(BAD_REQUEST);

        }
        String memberId = jwtTokenizer.getId(token);
        String refreshTokenInRedis = redisUtil.getToken(memberId);

        if (ObjectUtils.isEmpty(refreshTokenInRedis)) {
            throw new CustomException(LOG_OUT);
        }

        if (!refreshTokenInRedis.equals(refreshTokenCookie)) {
            redisUtil.deleteData(memberId);
            throw new CustomException(BAD_REQUEST);
        }
        redisUtil.deleteData(memberId);
        //엑세스토큰 재발급
        String newAccessToken = jwtTokenizer.createAccessToken(jwtTokenizer.getUsernameFromToken(refreshTokenInRedis),
                jwtTokenizer.getRoleListFromToken(refreshTokenInRedis));
        //리프레시토큰 재발급
        String newRefreshToken = jwtTokenizer.createRefreshToken(jwtTokenizer.getUsernameFromToken(refreshTokenInRedis),
                jwtTokenizer.getRoleListFromToken(refreshTokenInRedis));

        redisUtil.dataExpirationsInput(memberId,newRefreshToken,7);
        TokenRegenerateResponse tokenRegenerateResponse = TokenRegenerateResponse.of(newAccessToken);




        return cookieUtil.TokenCookie(newRefreshToken, tokenRegenerateResponse);
    }

}
