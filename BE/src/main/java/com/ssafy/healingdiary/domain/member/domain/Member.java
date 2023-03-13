package com.ssafy.healingdiary.domain.member.domain;

import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="member")
public class Member extends BaseEntity {

    @Column(name="member_id")
    private Long id;

    private String nickname;

    private String region;

    private String disease;

    private Integer age;

    @Column(name = "image_url")
    private String imageUrl;


}