package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="club_member")
@AttributeOverride(name = "id", column = @Column(name = "club_member_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "club_member_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "club_member_updated_date"))
public class ClubMember extends BaseEntity {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="club_id")
    private Club club;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @Column(name = "is_approved")
    private Boolean isApproved;

}
