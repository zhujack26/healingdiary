package com.ssafy.healingdiary.domain.comment.repository;

import com.ssafy.healingdiary.domain.comment.domain.Comment;
import com.ssafy.healingdiary.domain.diary.dto.DiaryListResponse;
import java.time.LocalDate;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
