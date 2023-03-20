package com.ssafy.healingdiary.domain.diary.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class Emotion {
    @Id
    private int code;
    private String value;
}
