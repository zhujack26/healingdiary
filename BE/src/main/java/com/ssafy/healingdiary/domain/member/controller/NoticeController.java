package com.ssafy.healingdiary.domain.member.controller;

import com.ssafy.healingdiary.domain.member.dto.DeleteNoticeId;
import com.ssafy.healingdiary.domain.member.dto.NoticeListResponse;
import com.ssafy.healingdiary.domain.member.service.NoticeService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/notices")
public class NoticeController {

    private final NoticeService noticeService;

    @GetMapping
    public List<NoticeListResponse> searchNoticeAll() {
        return noticeService.searchNoticeAll();
    }

    @PatchMapping("/{noticeId}")
    public void changeNoticeStatus(@PathVariable Long noticeId) {
        noticeService.changeNoticeStatus(noticeId);
    }

    @DeleteMapping("/{noticeId}")
    public DeleteNoticeId deleteNotice(@PathVariable Long noticeId) {
        return noticeService.deleteNotice(noticeId);
    }
}
