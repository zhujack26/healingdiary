package com.ssafy.healingdiary.domain.diary.repository;

import com.ssafy.healingdiary.domain.diary.domain.Comment;
import com.ssafy.healingdiary.domain.diary.dto.CommentResponse;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    void deleteAllByParentId(Long commentId);

    Slice<Comment> findByDiaryIdAndParentIdIsNull(Long diaryId, Pageable pageable);
}
