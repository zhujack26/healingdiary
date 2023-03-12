package com.ssafy.healingdiary.domain.club.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Table(name="club")
public class Club {

    @Id
    @GeneratedValue
    @Column(name = "club_id")
    private Long id;


    private String admin; //Nickname

    private String name;

    private String description;

    @Column(name="club_image_url")
    private String clubImageUrl;










}
