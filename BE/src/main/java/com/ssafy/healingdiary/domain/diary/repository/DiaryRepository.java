package com.ssafy.healingdiary.domain.diary.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.healingdiary.domain.diary.domain.QDiary.diary;
import static com.ssafy.healingdiary.domain.diary.domain.QDiaryTag.diaryTag;
import static com.ssafy.healingdiary.domain.tag.domain.QTag.tag;
import static org.springframework.util.StringUtils.hasText;

import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class DiaryRepository {
    private final JPAQueryFactory queryFactory;

    public Slice<DiaryListResponse> findByOption(Long clubId, String keyword, String tagContent, LocalDate date, Pageable pageable) {
        List<DiaryListResponse> result = queryFactory
            .selectFrom(diary)
            .leftJoin(diary.diaryTag, diaryTag)
            .leftJoin(diaryTag.tag, tag)
            .where(
                clubIdEq(clubId),
                keywordMatch(keyword),
                tagEq(tagContent),
                dateEq(date)
            )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize()+1)
            .transform(
                groupBy(diary.id).list(
                    Projections.fields(DiaryListResponse.class,
                        diary.id.as("diaryId"),
                        list(tag.content).as("tags"),
                        diary.diaryImageUrl.as("imageSrc"),
                        diary.createdDate
                    )
                )
            );

        boolean hasNext = false;
        if (result.size() > pageable.getPageSize()) {
            result.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(result, pageable, hasNext);
    }

    private BooleanExpression clubIdEq(Long clubId) {
        return clubId != null ? diary.club.id.eq(clubId) : null;
    }

    private BooleanExpression keywordMatch(String keyword) {
        return hasText(keyword) ? diary.content.contains(keyword) : null;
    }

    private BooleanExpression tagEq(String tagContent) {
        return hasText(tagContent) ? tag.content.eq(tagContent) : null;
    }

    public static BooleanExpression dateEq(LocalDate date) {
        if (date != null) {
            LocalDateTime startOfDay = LocalDateTime.of(date, LocalTime.MIN);
            LocalDateTime endOfDay = LocalDateTime.of(date, LocalTime.MAX).withNano(0);
            return diary.createdDate.between(startOfDay, endOfDay);
        } else {
            return null;
        }
    }


}
