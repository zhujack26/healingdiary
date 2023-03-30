package com.ssafy.healingdiary.domain.member.service;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.*;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.global.auth.PrincipalDetails;
import com.ssafy.healingdiary.global.auth.PrincipalDetailsService;
import com.ssafy.healingdiary.global.error.CustomException;
import com.ssafy.healingdiary.infra.storage.S3StorageClient;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.ssafy.healingdiary.global.error.ErrorCode.MEMBER_NOT_FOUND;

@Service
@Transactional
@AllArgsConstructor
public class MemberService {

    private final S3StorageClient s3Service;

    private final MemberRepository memberRepository;

    private final PrincipalDetailsService principalDetailsService;


    public MemberInfoResponse memberInfoFind(String accessToken) {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());
//        Member member = memberRepository.findMemberByProviderEmail("asdfaasdf");
        if(member == null){
            throw new CustomException(MEMBER_NOT_FOUND);
        }

        MemberInfoResponse foundMember =  MemberInfoResponse.of(member);

        return foundMember;
    }

    public MemberUpdateResponse memberUpdate(String accessToken,
                                             MemberUpdateRequest memberUpdateRequest,
                                             MultipartFile file) throws IOException {
        PrincipalDetails principalDetails = principalDetailsService.loadMemberByAccessToken(accessToken);
        Member member = memberRepository.findMemberByProviderEmail(principalDetails.getPassword());

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

}
