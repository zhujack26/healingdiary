package com.ssafy.healingdiary.domain.diary.domain;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="diary")
public class Diary extends BaseEntity {


    @Column(name = "diary_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @OneToMany(mappedBy = "diary")
    private List<DiaryTag> diaryTag = new ArrayList<>();

    private String title;

    private String content;

    @Column(name="diary_image_url")
    private String diaryImageUrl;

    @Column(name="record_url")
    private String recordUrl;

    @Enumerated(EnumType.STRING)
    private Emotion emotion;




}
