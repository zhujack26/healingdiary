package com.ssafy.healingdiary.domain.tag.dto;

import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TagListResponse {

    List<String> tags;
}
