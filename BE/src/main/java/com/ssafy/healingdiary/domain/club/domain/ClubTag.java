package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Table(name = "club_tag")
public class ClubTag extends BaseEntity {

    @Column(name = "diary_tag_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
