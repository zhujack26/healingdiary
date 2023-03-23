package com.ssafy.healingdiary.domain.diary.controller;


import com.ssafy.healingdiary.domain.diary.dto.CommentCreateRequest;
import com.ssafy.healingdiary.domain.diary.dto.CommentUpdateRequest;
import com.ssafy.healingdiary.domain.diary.service.CommentService;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    @GetMapping
    public Slice<CommentResponse> getCommentList(
//        Authentication authentication,
        @RequestParam Long diaryId,
        Pageable pageable
    ){
//        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return commentService.getCommentList(diaryId, pageable);
    }

    @PostMapping
    public Map<String, Object> createComment(
//        Authentication authentication,
        @RequestBody CommentCreateRequest request
    ){
//        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return commentService.createComment(request);
    }

    @PutMapping("/{commentId}")
    public Map<String, Object> updateComment(
//        Authentication authentication,
        @RequestBody CommentUpdateRequest request
    ){
//        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return commentService.updateComment(request);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(
//        Authentication authentication,
        @RequestParam Long memberId,
        @PathVariable Long commentId
    ){
//        UserDetails principal = (UserDetails) authentication.getPrincipal();
        commentService.deleteComment(memberId, commentId);
    }
}
