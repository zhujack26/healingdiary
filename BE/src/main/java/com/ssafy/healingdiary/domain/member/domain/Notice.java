package com.ssafy.healingdiary.domain.member.domain;

import com.ssafy.healingdiary.domain.diary.domain.Comment;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;

import javax.persistence.*;

@Entity
@Table(name = "notice")
public class Notice extends BaseEntity {

    @Column(name = "notice_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    private String Content;

    @Enumerated(EnumType.STRING)
    @Column(name = "check_status")
    private CheckStatus checkStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "delete_status")
    private DeleteStatus deleteStatus;


}
