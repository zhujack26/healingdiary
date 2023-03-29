package com.ssafy.healingdiary.domain.diary.domain;

import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import javax.persistence.criteria.Fetch;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="diary_tag")
@AttributeOverride(name = "id", column = @Column(name = "diary_tag_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "diary_tag_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "diary_tag_updated_date"))
public class DiaryTag extends BaseEntity {


    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @ManyToOne(fetch= FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
