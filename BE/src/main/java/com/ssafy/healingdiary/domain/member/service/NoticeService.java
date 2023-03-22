package com.ssafy.healingdiary.domain.member.service;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.NoticeListResponse;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.domain.member.repository.NoticeRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;
    public List<NoticeListResponse> searchNoticeAll() {
        Member member = memberRepository.findById(1L).get();
        List<NoticeListResponse> list = noticeRepository.findByMember(member)
            .stream().map(NoticeListResponse::of)
            .collect(Collectors.toList());
        return list;
    }
}
