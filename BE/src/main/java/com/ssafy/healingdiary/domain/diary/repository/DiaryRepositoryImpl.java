package com.ssafy.healingdiary.domain.diary.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.healingdiary.domain.diary.domain.QDiary.diary;
import static com.ssafy.healingdiary.domain.diary.domain.QDiaryTag.diaryTag;
import static com.ssafy.healingdiary.domain.tag.domain.QTag.tag;
import static org.springframework.util.StringUtils.hasText;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import com.ssafy.healingdiary.domain.diary.dto.QDiaryListResponse;
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
public class DiaryRepositoryImpl implements DiaryRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<DiaryListResponse> findByOption(Long clubId, String keyword, String tagContent, Integer year, Integer month, Integer day, Pageable pageable) {
        List<DiaryListResponse> result = queryFactory
            .selectFrom(diary)
            .leftJoin(diary.diaryTag, diaryTag)
            .leftJoin(diaryTag.tag, tag)
            .where(
                clubIdEq(clubId),
                keywordMatch(keyword),
                tagEq(tagContent),
                dateEq(year, month, day)
            )
            .orderBy(diary.createdDate.desc())
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize()+1)
            .transform(
                groupBy(diary.id).list(
                    new QDiaryListResponse(diary.id, diary.diaryImageUrl, diary.createdDate, list(tag.content))
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

    public static BooleanExpression dateEq(Integer year, Integer month, Integer day) {
        if (year != null && month != null && day != null) {
            LocalDateTime startOfDay = LocalDateTime.of(year, month, day, 0, 0, 0);
            LocalDateTime endOfDay = LocalDateTime.of(year, month, day, 59, 59, 59);
            return diary.createdDate.between(startOfDay, endOfDay);
        }
        else if(year != null && month != null) {
            return diary.createdDate.month().eq(month);
        }
        else if(year != null) {
            return diary.createdDate.year().eq(year);
        }
        else {
            return null;
        }
    }

}
