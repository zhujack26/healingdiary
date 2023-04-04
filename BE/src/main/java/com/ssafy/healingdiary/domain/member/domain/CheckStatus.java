package com.ssafy.healingdiary.domain.member.domain;

import java.util.Arrays;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@Getter
@AllArgsConstructor
public enum CheckStatus {
    UNCHECKED(false), CHECKED(true);
    private final boolean value;
    public static CheckStatus ofValue(boolean value) {
        return value ? CHECKED : UNCHECKED;
    }
    public static boolean ofFlag(CheckStatus flag) {
        return CheckStatus.CHECKED == flag ? true : false;
    }
}
