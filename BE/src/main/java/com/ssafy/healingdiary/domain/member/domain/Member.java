package com.ssafy.healingdiary.domain.member.domain;

import com.ssafy.healingdiary.domain.club.domain.Club;
import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
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

    @NotNull
    private Integer age; //카카오 나이는 문자열로 받음 근데 나이는 정수로 하는게 좋을거같은데 모르겠음

    @Column(name = "image_url")
    private String imageUrl;


    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Diary> diary = new ArrayList<>();

    @OneToMany(mappedBy = "club",cascade = CascadeType.ALL)
    private List<ClubMember> clubMember = new ArrayList<>();




}