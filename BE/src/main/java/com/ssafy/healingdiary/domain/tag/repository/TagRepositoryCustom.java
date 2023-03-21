package com.ssafy.healingdiary.domain.tag.repository;

import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepositoryCustom {

    List<String> findByTagLike(String tag);
}
