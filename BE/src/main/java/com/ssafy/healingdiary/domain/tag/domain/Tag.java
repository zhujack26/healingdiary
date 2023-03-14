package com.ssafy.healingdiary.domain.tag.domain;

import com.ssafy.healingdiary.domain.club.domain.ClubTag;
import com.ssafy.healingdiary.domain.diary.domain.DiaryTag;
import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="tag")
public class Tag {
    @Id
    @GeneratedValue
    @Column(name="tag_id")
    private Long id;

    @NotNull
    private String content;

    @OneToMany(mappedBy = "tag",cascade = CascadeType.ALL)
    private List<DiaryTag> diaryTag = new ArrayList<>();

    @OneToMany(mappedBy = "tag",cascade = CascadeType.ALL)
    private List<ClubTag> clubTag = new ArrayList<>();
}
