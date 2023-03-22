package com.ssafy.healingdiary.domain.diary.service;

import com.ssafy.healingdiary.domain.diary.domain.Comment;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import com.ssafy.healingdiary.domain.diary.repository.CommentRepository;
import com.ssafy.healingdiary.domain.diary.repository.DiaryRepository;
import com.ssafy.healingdiary.domain.member.repository.MemberRepository;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;

    public Slice<CommentResponse> getCommentList(Long diaryId, Pageable pageable) {
        Slice<CommentResponse> comments = commentRepository.findByDiaryId(diaryId, pageable);
        return comments;
    }

    public Map<String, Object> createComment(Long memberId, Long diaryId, String content) {
        Map<String, Object> map = new HashMap<>();
        map.put("commentId", 1L);
        return map;
    }

    public Map<String, Object> updateComment(Long memberId, Long commentId, String content) {
        Map<String, Object> map = new HashMap<>();
        map.put("commentId", 1L);
        return map;
    }

    public void deleteComment(Long memberId, Long commentId) {
    }
}
