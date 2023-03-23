package com.ssafy.healingdiary.domain.tag.repository;

import static com.ssafy.healingdiary.domain.tag.domain.QTag.tag;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.domain.tag.dto.TagListResponse;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.hibernate.criterion.Projection;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class TagRepositoryImpl implements TagRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<TagListResponse> findByTagLike(String keyword) {
        List<TagListResponse> tags = queryFactory
            .select(
                Projections.fields(TagListResponse.class,
                tag.id.as("id"),
                tag.content.as("content")))
            .from(tag)
            .where(tag.content.like(keyword+"%"))
            .stream().collect(Collectors.toList());
        return tags;
    }
}
