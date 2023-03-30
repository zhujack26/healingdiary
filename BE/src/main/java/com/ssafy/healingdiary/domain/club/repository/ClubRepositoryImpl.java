package com.ssafy.healingdiary.domain.club.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.healingdiary.domain.club.domain.QClub.club;
import static com.ssafy.healingdiary.domain.club.domain.QClubMember.clubMember;
import static com.ssafy.healingdiary.domain.club.domain.QClubTag.clubTag;
import static com.ssafy.healingdiary.domain.tag.domain.QTag.tag;
import static org.springframework.util.StringUtils.hasText;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.healingdiary.domain.club.dto.ClubListResponse;
import com.ssafy.healingdiary.domain.club.dto.ClubSimpleResponse;
import com.ssafy.healingdiary.domain.club.dto.QClubListResponse;
import com.ssafy.healingdiary.domain.club.dto.QClubSimpleResponse;
import com.ssafy.healingdiary.domain.member.domain.Member;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ClubRepositoryImpl implements ClubRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Slice<ClubSimpleResponse> findByIdAndTagId(Long memberId, Long tagId, String keyword,
        Pageable pageable) {
        List<ClubSimpleResponse> result = null;
        if (memberId != null) {
            result = queryFactory
                .selectFrom(club)
                .leftJoin(club.clubMember, clubMember)
                .leftJoin(club.clubTag, clubTag)
                .leftJoin(clubTag.tag, tag)
                .where(
                    idEq(memberId),
                    tagEq(tagId),
                    keywordMatch(keyword)
                )
                .orderBy(club.createdDate.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize() + 1)
                .transform(
                    groupBy(club.id).list(
                        new QClubSimpleResponse(club.id, club.name, club.clubImageUrl,
                            list(tag.content))
                    )
                );
        } else {
            result = queryFactory
                .selectFrom(club)
                .leftJoin(club.clubTag, clubTag)
                .leftJoin(clubTag.tag, tag)
                .where(
                    tagEq(tagId),
                    keywordMatch(keyword)
                )
                .orderBy(club.createdDate.desc())
                .transform(
                    groupBy(club.id).list(
                        new QClubSimpleResponse(club.id, club.name, club.clubImageUrl,
                            list(tag.content))
                    )
                );
        }

        boolean hasNext = false;
        if (result.size() > pageable.getPageSize()) {
            result.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(result, pageable, hasNext);
    }

    @Override
    public Slice<ClubListResponse> findUnionList(Member memberInfo, Pageable pageable) {
        Set<Long> idSet = queryFactory
            .select(clubMember.club.id)
            .from(clubMember)
            .where(
                diseaseOrRegion(memberInfo.getDisease(), memberInfo.getRegion())
            )
            .fetch()
            .stream()
            .collect(Collectors.toUnmodifiableSet());

        List<ClubListResponse> result = queryFactory
            .selectFrom(club)
            .leftJoin(club.clubTag, clubTag)
            .leftJoin(clubTag.tag, tag)
            .leftJoin(club.clubMember, clubMember)
            .where(
                club.id.in(idSet),
                clubMember.member.id.ne(memberInfo.getId())
            )
            .groupBy(club.id)
            .orderBy(clubMember.count().desc())
            .transform(
                groupBy(club.id).list(
                    new QClubListResponse(
                        club.id, club.name, club.clubImageUrl)
                )
            );

        List<ClubListResponse> result2 = queryFactory
            .selectFrom(club)
            .leftJoin(club.clubTag, clubTag)
            .leftJoin(clubTag.tag, tag)
            .leftJoin(club.clubMember, clubMember)
            .where(
                club.id.notIn(idSet),
                clubMember.member.id.ne(memberInfo.getId())
            )
            .transform(
                groupBy(club.id).list(
                    new QClubListResponse(
                        club.id, club.name, club.clubImageUrl)
                )
            );
        result.addAll(result2);
        boolean hasNext = false;
        if (result.size() > pageable.getPageSize()) {
            result.remove(pageable.getPageSize());
            hasNext = true;
        }

        return new SliceImpl<>(result, pageable, hasNext);
    }

    private BooleanExpression idEq(Long memberId) {
        return memberId != null ? clubMember.member.id.eq(memberId) : null;
    }

    private BooleanExpression tagEq(Long tagId) {
        return tagId != null ? clubTag.tag.id.eq(tagId) : null;
    }

    private BooleanExpression keywordMatch(String keyword) {
        return hasText(keyword) ? club.description.contains(keyword) : null;
    }

    private BooleanExpression diseaseOrRegion(String disease, String region) {
        return clubMember.member.disease.eq(disease).or(clubMember.member.region.eq(region));
    }
}
