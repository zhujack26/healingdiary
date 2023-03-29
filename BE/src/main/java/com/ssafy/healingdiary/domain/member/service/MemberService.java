package com.ssafy.healingdiary.domain.member.service;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.MemberInfo;
import com.ssafy.healingdiary.domain.member.dto.MemberUpdate;
import com.ssafy.healingdiary.domain.member.dto.NicknameCheck;
import com.ssafy.healingdiary.domain.member.dto.NicknameCheckReqDto;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import com.ssafy.healingdiary.global.error.CustomException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import static com.ssafy.healingdiary.global.error.ErrorCode.MEMBER_NOT_FOUND;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final PrincipalDetailsService principalDetailsService;


    public MemberInfo memberInfoFind(String accessToken) {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());
//        Member member = memberRepository.findMemberByProviderEmail("asdfaasdf");
        if(member == null){
            throw new CustomException(MEMBER_NOT_FOUND);
        }

        MemberInfo foundMember =  MemberInfo.of(member);

        return foundMember;
    }

    public MemberUpdate memberUpdate(String accessToken, MemberUpdate memberUpdate) {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());
//        Member member = memberRepository.findById(1L)
//                .orElseThrow(() -> {
//                    throw new CustomException(NOT_FOUND_USER);
//                });
        System.out.println("컴온");
        System.out.println(member.getProviderEmail());
        if(member == null){
            throw new CustomException(MEMBER_NOT_FOUND);
        }
        member.updateMember(memberUpdate);
        MemberUpdate foundMember =  MemberUpdate.of(member);

        return foundMember;
    }

    public NicknameCheck nicknameCheck(NicknameCheckReqDto nickname) {
        Member member = memberRepository.findMemberByNickname(nickname.getNickname());
        if(member == null){
            NicknameCheck foundMember =  NicknameCheck.of(false);
            return foundMember;
        }
        else{
            NicknameCheck foundMember =  NicknameCheck.of(true);
            System.out.println(foundMember);
            return foundMember;
        }

    }

}
