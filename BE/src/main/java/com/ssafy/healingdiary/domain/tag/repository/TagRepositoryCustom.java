package com.ssafy.healingdiary.domain.tag.repository;

import com.ssafy.healingdiary.domain.tag.domain.Tag;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepositoryCustom {

    List<Tag> findByTagLike(String tag);
}
