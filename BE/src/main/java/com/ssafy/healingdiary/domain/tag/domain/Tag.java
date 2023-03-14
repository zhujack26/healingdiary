package com.ssafy.healingdiary.domain.tag.domain;

import com.ssafy.healingdiary.domain.club.domain.ClubTag;
import com.ssafy.healingdiary.domain.diary.domain.DiaryTag;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="tag")
@AttributeOverride(name = "id", column = @Column(name = "tag_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "tag_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "tag_updated_date"))
public class Tag extends BaseEntity {

    @NotNull
    private String content;

    @OneToMany(mappedBy = "tag",cascade = CascadeType.ALL)
    private List<DiaryTag> diaryTag = new ArrayList<>();

    @OneToMany(mappedBy = "tag",cascade = CascadeType.ALL)
    private List<ClubTag> clubTag = new ArrayList<>();
}
