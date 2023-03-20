package com.ssafy.healingdiary.domain.tag.controller;

import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/tags")
public class TagController {

    private final RedisTemplate redisTemplate;
    @GetMapping
    public ResponseEntity<?> tagAllList() {
        redisTemplate.opsForValue()
            .set("RT:" + "name", "token",
                30000000000L, TimeUnit.MILLISECONDS);
        return ResponseEntity.ok("success");
    }
}
