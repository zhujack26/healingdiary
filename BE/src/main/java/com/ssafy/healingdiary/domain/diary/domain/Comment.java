package com.ssafy.healingdiary.domain.diary.domain;

import com.ssafy.healingdiary.domain.member.domain.Member;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue
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
