package com.ssafy.healingdiary.domain.diary.domain;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "comment")
public class Comment extends BaseEntity {

    @Column(name = "comment_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String content;

    @ManyToOne
    @JoinColumn(name="parent_comment_id")
    private Comment parentComment;



}
