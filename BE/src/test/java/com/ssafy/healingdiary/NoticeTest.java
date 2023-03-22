package com.ssafy.healingdiary;

import com.ssafy.healingdiary.domain.member.domain.Member;
import com.ssafy.healingdiary.domain.member.dto.NoticeListResponse;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import com.ssafy.healingdiary.domain.member.repository.NoticeRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class NoticeTest {

    @Autowired
    NoticeRepository noticeRepository;
    @Autowired
    MemberRepository memberRepository;
    @Test
    void test() {
        Member member = memberRepository.findById(1L).get();
        List<NoticeListResponse> list = noticeRepository.findByMember(member)
            .stream().map(NoticeListResponse::of)
            .collect(Collectors.toList());
        list.stream().forEach((item)->{
            System.out.println(item.isCheckStatus()+" "+item.isDeleteStatus());
        });
    }
}
