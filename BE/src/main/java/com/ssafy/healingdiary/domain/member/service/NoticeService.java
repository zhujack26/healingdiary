package com.ssafy.healingdiary.domain.member.service;

import static com.ssafy.healingdiary.global.error.ErrorCode.NOTICE_NOT_FOUND;

import com.ssafy.healingdiary.domain.member.domain.CheckStatus;
import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.domain.Notice;
import com.ssafy.healingdiary.domain.member.dto.DeleteNoticeRequest;
import com.ssafy.healingdiary.domain.member.dto.NoticeListResponse;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.domain.member.repository.NoticeRepository;
import com.ssafy.healingdiary.global.error.CustomException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;
    public List<NoticeListResponse> searchNoticeAll(String memberId) {
        Member member = memberRepository.getReferenceById(Long.parseLong(memberId));
        System.out.println(memberId+"~~~~~~~~~~~~~");
        List<NoticeListResponse> list = noticeRepository.findByMember(member)
            .stream().map((NoticeListResponse::of))
            .collect(Collectors.toList());
        return list;
    }

    public void changeNoticeStatus(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId).orElseThrow(()->new CustomException(NOTICE_NOT_FOUND));
        notice.changeCheckStatus(CheckStatus.CHECKED);
        noticeRepository.save(notice);
    }

    public DeleteNoticeRequest deleteNotice(Long noticeId) {
        Notice notice = noticeRepository.findById(noticeId).orElseThrow(()->new CustomException(NOTICE_NOT_FOUND));
        noticeRepository.delete(notice);
        return DeleteNoticeRequest.builder().noticeId(noticeId).build();
    }
}
