package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name="club")
public class Club extends BaseEntity {


    @Column(name = "club_id")
    private Long id;


    private String admin; //Nickname

    private String name;

    private String description;

    @Column(name="club_image_url")
    private String clubImageUrl;

    @OneToMany(mappedBy = "member")
    private List<ClubMember> clubMember = new ArrayList<>();

    @OneToMany(mappedBy = "club")
    private List<ClubTag> clubTag = new ArrayList<>();

    @OneToMany(mappedBy = "club")
    private List<Diary> diary = new ArrayList<>();










}
