package com.ssafy.healingdiary.domain.club.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.healingdiary.domain.club.domain.Club;
import lombok.Builder;
import lombok.Getter;
import org.apache.tomcat.util.digester.ArrayStack;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class ClubSimpleResponse {
    Long clubId;
    String name;

    String imageSrc;
    List<String> tags;

//    @QueryProjection
//    public ClubSimpleResponse(Long clubId, String imageSrc, String name, List<String> tags) {
//        this.clubId = clubId;
//        this.name = name;
//        this.imageSrc = imageSrc;
//        this.tags = tags;
//    }

    public static ClubSimpleResponse of(Club club){
        List<String> tagList = club.getClubTag()
                .stream()
                .map(tag->  tag.getTag().getContent())
                .collect(Collectors.toList());

        return ClubSimpleResponse.builder()
                .clubId(club.getId())
                .imageSrc(club.getClubImageUrl())
                .name(club.getName())
                .tags(tagList)
                .build();
    }
}
