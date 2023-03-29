package com.ssafy.healingdiary.domain.club.dto;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.member.domain.Member;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class InvitationRegisterResponse {

    private Long clubId;
    private String msg;

    public static InvitationRegisterResponse of(Long clubId) {
        return InvitationRegisterResponse.builder()
            .clubId(clubId)
            .build();
    }

    public static InvitationRegisterResponse of(String msg) {
        return InvitationRegisterResponse.builder()
            .msg(msg)
            .build();
    }
}
