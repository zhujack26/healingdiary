package com.ssafy.healingdiary.domain.member.service;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.*;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import com.ssafy.healingdiary.global.error.CustomException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static com.ssafy.healingdiary.global.error.ErrorCode.NOT_FOUND_USER;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final PrincipalDetailsService principalDetailsService;


    public MemberInfoResponse memberInfoFind(String accessToken) {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());
//        Member member = memberRepository.findMemberByProviderEmail("asdfaasdf");
        if(member == null){
            throw new CustomException(NOT_FOUND_USER);
        }

        MemberInfoResponse foundMember =  MemberInfoResponse.of(member);

        return foundMember;
    }

    public MemberUpdateResponse memberUpdate(String accessToken, MemberUpdateRequest memberUpdateRequest) {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());
//        Member member = memberRepository.findById(1L)
//                .orElseThrow(() -> {
//                    throw new CustomException(NOT_FOUND_USER);
//                });
        System.out.println("컴온");
        System.out.println(member.getProviderEmail());
        if(member == null){
            throw new CustomException(NOT_FOUND_USER);
        }
        member.updateMember(memberUpdateRequest);
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

}
