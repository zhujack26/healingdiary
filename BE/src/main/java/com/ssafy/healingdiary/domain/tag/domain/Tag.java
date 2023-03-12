package com.ssafy.healingdiary.domain.tag.domain;

import javax.persistence.*;

@Entity
@Table(name="tag")
public class Tag {
    @Id
    @GeneratedValue
    @Column(name="tag_id")
    private Long id;

    private String content;
}
