package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "club_tag")
public class ClubTag {

    @Id
    @GeneratedValue
    @Column(name = "diary_tag_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
