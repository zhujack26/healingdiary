package com.ssafy.healingdiary.domain.member.domain;

import com.ssafy.healingdiary.domain.diary.domain.Comment;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "notice")
@Getter
@AttributeOverride(name = "id", column = @Column(name = "notice_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "notice_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "notice_updated_date"))
public class Notice extends BaseEntity {


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
