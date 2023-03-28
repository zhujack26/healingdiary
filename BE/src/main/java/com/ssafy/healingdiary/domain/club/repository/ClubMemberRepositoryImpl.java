package com.ssafy.healingdiary.domain.club.repository;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;
import static com.ssafy.healingdiary.domain.club.domain.QClub.club;
import static com.ssafy.healingdiary.domain.club.domain.QClubMember.clubMember;
import static com.ssafy.healingdiary.domain.member.domain.QMember.member;
import static com.ssafy.healingdiary.domain.tag.domain.QTag.tag;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.healingdiary.domain.club.dto.ClubInvitationResponse;
import com.ssafy.healingdiary.domain.club.dto.QClubInvitationResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ClubMemberRepositoryImpl implements ClubMemberRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    // select * from member where member_id
    // in (select cm.member_id from club_member cm join club c
    // where cm.club_id != 1 and member.member_id!=1);
    @Override
    public Slice<ClubInvitationResponse> findDistinctByClubIdNot(Long clubId, Long hostId,Pageable pageable) {
        JPAQuery<ClubInvitationResponse> query = queryFactory
            .select(new QClubInvitationResponse(member.nickname, member.memberImageUrl))
            .from(member)
            .where(
                member.id.in(
                    JPAExpressions
                        .select(clubMember.member.id)
                        .from(clubMember)
                        .join(club).on(member.id.eq(clubMember.member.id))
                        .where(
                            clubMember.club.id.ne(clubId),
                            member.id.ne(hostId)
                        )
                )
            );

        List<ClubInvitationResponse> result = query
            .limit(pageable.getPageSize() + 1)
            .fetch();

        boolean hasNext = false;
        if (result.size() > pageable.getPageSize()) {
            result.remove(pageable.getPageSize());
            hasNext = true;
        }
        return new SliceImpl<>(result, pageable, hasNext);
    }

    private BooleanExpression clubIdNe(Long clubId) {
        return clubId != null ? clubMember.club.id.ne(clubId) : null;
    }
}
