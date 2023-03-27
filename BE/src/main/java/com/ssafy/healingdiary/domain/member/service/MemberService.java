package com.ssafy.healingdiary.domain.member.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.MemberInfo;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    private final PrincipalDetailsService principalDetailsService;


    public MemberInfo getUserByProviderEmail(String accessToken) throws EntityNotFoundException {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        MemberInfo foundMember =  MemberInfo.of(memberRepository.getMemberByProviderEmail(principalDetails.getPassword()));

        return foundMember;
    }

}
