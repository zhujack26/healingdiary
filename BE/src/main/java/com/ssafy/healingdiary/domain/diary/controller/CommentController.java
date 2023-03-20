package com.ssafy.healingdiary.domain.diary.controller;


import com.ssafy.healingdiary.domain.diary.dto.CommentIdResponse;
import com.ssafy.healingdiary.domain.diary.service.CommentService;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
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

    private CommentService commentService;

    @GetMapping
    public List<CommentResponse> getCommentList(Authentication authentication, @RequestParam Long diaryId, Pageable pageable){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return commentService.getCommentList(principal, diaryId, pageable);
    }

    @PostMapping
    public CommentIdResponse createComment(Authentication authentication, @RequestParam Long diaryId, @RequestBody String content){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return commentService.createComment(principal, diaryId, content);
    }

    @PutMapping("/{commentId}")
    public CommentIdResponse updateComment(Authentication authentication, @PathVariable Long commentId, @RequestBody String content){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        return commentService.updateComment(principal, commentId, content);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(Authentication authentication, @PathVariable Long commentId, @RequestBody String content){
        UserDetails principal = (UserDetails) authentication.getPrincipal();
        commentService.deleteComment(principal, commentId);
    }
}
