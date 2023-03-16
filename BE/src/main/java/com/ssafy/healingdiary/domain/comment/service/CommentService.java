package com.ssafy.healingdiary.domain.comment.service;

import com.ssafy.healingdiary.domain.comment.repository.CommentRepository;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    public List<CommentResponse> getCommentList(UserDetails principal, Long diaryId, Pageable pageable) {
        List<CommentResponse> comments = new ArrayList<>();
        return comments;
    }

    public Long createComment(UserDetails principal, Long diaryId, String content) {
        return 1L;
    }

    public Long updateComment(UserDetails principal, Long commentId, String content) {
        return 1L;
    }

    public void deleteComment(UserDetails principal, Long commentId) {
    }
}
