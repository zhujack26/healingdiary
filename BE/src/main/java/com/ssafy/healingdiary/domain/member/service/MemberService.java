package com.ssafy.healingdiary.domain.member.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.MemberInfo;
import com.ssafy.healingdiary.domain.member.dto.MemberUpdate;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import com.ssafy.healingdiary.global.error.CustomException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;

import static com.ssafy.healingdiary.global.error.ErrorCode.NOT_FOUND_USER;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final PrincipalDetailsService principalDetailsService;


    public MemberInfo memberInfoFind(String accessToken) {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());
        if(member == null){
            throw new CustomException(NOT_FOUND_USER);
        }

        MemberInfo foundMember =  MemberInfo.of(member);

        return foundMember;
    }

    public MemberUpdate memberUpdate(String accessToken, MemberUpdate memberUpdate) {
//        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
//        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());
        Member member = memberRepository.findById(1L)
                .orElseThrow(() -> {
                    throw new CustomException(NOT_FOUND_USER);
                });
        System.out.println("컴온");
        System.out.println(member.getProviderEmail());
//        if(member == null){
//            throw new CustomException(NOT_FOUND_USER);
//        }
        member.updateMember(memberUpdate);
        MemberUpdate foundMember =  MemberUpdate.of(member);

        return foundMember;
    }

}
