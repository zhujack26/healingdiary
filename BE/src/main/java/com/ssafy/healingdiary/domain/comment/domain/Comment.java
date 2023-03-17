package com.ssafy.healingdiary.domain.comment.domain;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;

@Entity
@Getter
@Table(name = "comment")
@AttributeOverride(name = "id", column = @Column(name = "comment_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "comment_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "comment_updated_date"))
public class Comment extends BaseEntity {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="parent_comment_id")
    private Comment parentComment;



}
