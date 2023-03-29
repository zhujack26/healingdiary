package com.ssafy.healingdiary.domain.club.domain;

import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.BatchSize;

@Entity
@Getter
@Table(name="club")
@Builder
@AttributeOverride(name = "id", column = @Column(name = "club_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "club_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "club_updated_date"))
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
public class Club extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    private Member host;

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
