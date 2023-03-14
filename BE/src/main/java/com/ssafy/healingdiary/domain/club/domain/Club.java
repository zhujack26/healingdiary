package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name="club")
public class Club extends BaseEntity {


    @Column(name = "club_id")
    private int id;


    @NotNull
    private Long admin; //userId

    @NotNull
    private String name;

    @NotNull
    private String description;

    @Column(name="club_image_url")
    private String clubImageUrl;

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<ClubMember> clubMember = new ArrayList<>();

    @OneToMany(mappedBy = "club",cascade = CascadeType.ALL)
    private List<ClubTag> clubTag = new ArrayList<>();

    @OneToMany(mappedBy = "club",cascade = CascadeType.ALL)
    private List<Diary> diary = new ArrayList<>();


}
