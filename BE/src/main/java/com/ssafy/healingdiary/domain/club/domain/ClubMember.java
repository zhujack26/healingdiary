package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.domain.Status;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="club_member")
public class ClubMember {
    @Id
    @GeneratedValue
    @Column(name="club_member_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    private Status status;

}
