package com.ssafy.healingdiary.domain.tag.repository;

import static com.ssafy.healingdiary.domain.tag.domain.QTag.tag;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TagRepositoryImpl implements TagRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Tag> findByTagLike(String keyword) {
        List<Tag> tags = queryFactory
            .select(tag)
            .from(tag)
            .where(tag.content.like(keyword+"%"))
            .stream().collect(Collectors.toList());
        return tags;
    }
}
