package com.ssafy.healingdiary.domain.member.domain;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

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


    @OneToMany(mappedBy = "member")
    private List<Diary> diary = new ArrayList<>();

    @OneToMany(mappedBy = "club")
    private List<ClubMember> clubMember = new ArrayList<>();




}