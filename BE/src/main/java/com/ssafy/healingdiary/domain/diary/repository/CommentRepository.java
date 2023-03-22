package com.ssafy.healingdiary.domain.diary.repository;

import com.ssafy.healingdiary.domain.diary.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>, CommentRepositoryCustom {

}
