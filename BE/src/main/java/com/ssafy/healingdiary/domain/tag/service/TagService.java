package com.ssafy.healingdiary.domain.tag.service;

import com.ssafy.healingdiary.domain.tag.dto.TagListResponse;
import com.ssafy.healingdiary.domain.tag.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagService {

    private final TagRepository tagRepository;
    public TagListResponse searchTagList(String tag) {
        TagListResponse tagListResponse = TagListResponse.builder()
            .tags(tagRepository.findByTagLike(tag))
            .build();
        return tagListResponse;
    }
}
