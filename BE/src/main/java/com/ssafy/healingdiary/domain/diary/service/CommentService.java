package com.ssafy.healingdiary.domain.diary.service;

import com.ssafy.healingdiary.domain.diary.dto.CommentIdResponse;
import com.ssafy.healingdiary.domain.diary.repository.CommentRepository;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public CommentIdResponse createComment(UserDetails principal, Long diaryId, String content) {
        return new CommentIdResponse(1L);
    }

    public CommentIdResponse updateComment(UserDetails principal, Long commentId, String content) {
        return new CommentIdResponse(1L);
    }

    public void deleteComment(UserDetails principal, Long commentId) {
    }
}
