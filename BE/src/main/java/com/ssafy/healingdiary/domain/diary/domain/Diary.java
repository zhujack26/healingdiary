package com.ssafy.healingdiary.domain.diary.domain;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="diary")
public class Diary extends BaseEntity {


    @Column(name = "diary_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @OneToMany(mappedBy = "diary",cascade = CascadeType.ALL)
    private List<DiaryTag> diaryTag = new ArrayList<>();

    @NotNull
    private String content; // stt로 된 음성을 텍스트로 변환된 내용

    @Column(name="diary_image_url")
    private String diaryImageUrl;

    @NotNull
    @Column(name="record_url")
    private String recordUrl;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Emotion emotion;




}
