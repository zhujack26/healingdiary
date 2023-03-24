package com.ssafy.healingdiary.domain.tag.repository;

import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.domain.tag.dto.TagListResponse;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepositoryCustom {

    List<TagListResponse> findByTagLike(String tag);
}
