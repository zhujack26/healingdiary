package com.ssafy.healingdiary.domain.diary.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.healingdiary.domain.diary.domain.QComment.comment;
import static com.ssafy.healingdiary.domain.diary.domain.QDiary.diary;
import static com.ssafy.healingdiary.domain.diary.domain.QDiaryTag.diaryTag;
import static com.ssafy.healingdiary.domain.member.domain.QMember.member;
import static com.ssafy.healingdiary.domain.tag.domain.QTag.tag;
import static org.springframework.util.StringUtils.hasText;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import com.ssafy.healingdiary.domain.diary.dto.DiarySimpleResponse;
import com.ssafy.healingdiary.domain.diary.dto.QCommentResponse;
import com.ssafy.healingdiary.domain.diary.dto.QDiarySimpleResponse;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class CommentRepositoryImpl implements CommentRepositoryCustom {
    private final JPAQueryFactory queryFactory;


    @Override
    public Slice<CommentResponse> findByDiaryId(Long diaryId, Pageable pageable) {
        List<CommentResponse> result = queryFactory
            .select(
                new QCommentResponse(
                    comment.id,
                    comment.member.id,
                    comment.parentComment.id,
                    member.memberImageUrl,
                    member.nickname,
                    comment.createdDate,
                    comment.content
                )
            )
            .from(comment)
            .innerJoin(comment.member, member)
            .where(
                comment.diary.id.eq(diaryId)
            )
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize()+1)
            .fetch();

        boolean hasNext = false;
        if (result.size() > pageable.getPageSize()) {
            result.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(result, pageable, hasNext);
    }
}
