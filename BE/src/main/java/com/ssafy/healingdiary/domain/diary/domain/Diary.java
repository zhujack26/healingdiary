package com.ssafy.healingdiary.domain.diary.domain;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.member.domain.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name="diary")
public class Diary {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    private String title;

    private String content;

    @Column(name="diary_image_url")
    private String diaryImageUrl;

    @Column(name="record_url")
    private String recordUrl;

    @Enumerated(EnumType.STRING)
    private Emotion emotion;




}
