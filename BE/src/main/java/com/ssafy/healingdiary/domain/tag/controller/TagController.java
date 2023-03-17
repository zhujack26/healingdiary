package com.ssafy.healingdiary.domain.tag.controller;


import com.ssafy.healingdiary.domain.tag.domain.Tag;
import com.ssafy.healingdiary.domain.tag.repository.TagRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tags")
public class TagController {

    private final TagRepository tagRepository;
    @GetMapping
    public ResponseEntity<?> tagAllList() {
        List<Tag> list = tagRepository.findAll();
        list.stream().forEach(System.out::println);
        return ResponseEntity.ok(list);
    }
}
