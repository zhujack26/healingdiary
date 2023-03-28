package com.ssafy.healingdiary.domain.member.domain;

import com.ssafy.healingdiary.domain.club.domain.ClubMember;
import com.ssafy.healingdiary.domain.diary.domain.Diary;
import com.ssafy.healingdiary.domain.member.dto.MemberUpdate;
import com.ssafy.healingdiary.global.common.domain.BaseEntity;
import com.sun.istack.NotNull;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="member")
@AttributeOverride(name = "id", column = @Column(name = "member_id"))
@AttributeOverride(name = "createdDate", column = @Column(name = "member_created_date"))
@AttributeOverride(name = "updatedDate", column = @Column(name = "member_updated_date"))
public class Member extends BaseEntity {


    @NotNull
    @Column(name="provider_email")
    private String providerEmail;

    private String nickname;

    private String region;

    private String disease;

    @Column(name = "member_image_url")
    private String memberImageUrl;

    private String roles; // USER, MANAGER, ADMIN

    @Builder.Default
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Diary> diary = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "club",cascade = CascadeType.ALL)
    private List<ClubMember> clubMember = new ArrayList<>();

    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();
    }
    public void updateMember(MemberUpdate memberInfo){
        if(memberInfo.getNickname() != null){
            this.nickname = memberInfo.getNickname();
        }
        else{
            this.nickname = this.getNickname();
        }
        if(memberInfo.getRegion() != null){
            this.region = memberInfo.getRegion();
        }
        else{
            this.region = this.getRegion();
            System.out.println("region : null");
        }
        if(memberInfo.getDisease() != null){
            this.disease = memberInfo.getDisease();
        }else{
            this.disease = this.getDisease();

        }

    }


}