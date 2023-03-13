package com.ssafy.healingdiary.domain.tag.domain;

import com.ssafy.healingdiary.domain.diary.domain.DiaryTag;

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

    private String content;

    @OneToMany(mappedBy = "tag")
    private List<DiaryTag> diaryTag = new ArrayList<>();
}
