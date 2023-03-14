package com.ssafy.healingdiary.domain.member.domain;

import com.ssafy.healingdiary.domain.diary.domain.Comment;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;

import javax.persistence.*;

@Entity
@Table(name = "notice")
public class Notice extends BaseEntity {

    @Column(name = "notice_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @NotNull
    private String Content;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "check_status")
    private CheckStatus checkStatus;

    @Enumerated(EnumType.STRING)
    @NotNull
    @Column(name = "delete_status")
    private DeleteStatus deleteStatus;


}
