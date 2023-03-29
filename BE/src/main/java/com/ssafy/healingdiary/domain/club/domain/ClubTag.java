package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
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
@Table(name = "club_tag")
@AttributeOverride(name = "id", column = @Column(name = "club_tag_id"))
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
