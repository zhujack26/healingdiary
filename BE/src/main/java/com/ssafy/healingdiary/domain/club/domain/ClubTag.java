package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name = "club_tag")
@AttributeOverride(name = "id", column = @Column(name = "diary_tag_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "club_tag_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "club_tag_updated_date"))
public class ClubTag extends BaseEntity {


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "club_id")
    private Club club;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
