package com.ssafy.healingdiary.domain.tag.repository;

import com.ssafy.healingdiary.domain.tag.domain.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

}
