package com.ssafy.healingdiary.domain.tag.dto;

import com.ssafy.healingdiary.domain.tag.domain.Tag;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TagListResponse {

    Long tagId;
    String tag;
    public static TagListResponse of(Tag tag){
        return TagListResponse.builder()
            .tagId(tag.getId())
            .tag(tag.getContent())
            .build();
    }
}
