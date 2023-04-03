package com.ssafy.healingdiary.domain.member.domain;

import lombok.Getter;

@Getter
public enum CheckStatus {
    UNCHECKED(false), CHECKED(true);
    private final boolean value;
    CheckStatus(boolean value) {
        this.value = value;
    }
    public static CheckStatus ofValue(boolean value) {
        return value ? CHECKED : UNCHECKED;
    }
    public static boolean ofFlag(CheckStatus flag) {
        return CheckStatus.CHECKED == flag;
    }
}
