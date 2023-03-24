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
@AttributeOverride(name = "id", column = @Column(name = "member_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "member_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "member_updated_date"))
public class Member extends BaseEntity {


    @NotNull
    private String email;

    private String nickname;

    private String region;

    private String disease;

    @Column(name = "member_image_url")
    private String memberImageUrl;

    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Diary> diary = new ArrayList<>();

    @OneToMany(mappedBy = "club",cascade = CascadeType.ALL)
    private List<ClubMember> clubMember = new ArrayList<>();




}