package com.ssafy.healingdiary.domain.member.domain;

import java.util.Arrays;
import lombok.Getter;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;

@Getter
public enum DeleteStatus {
    UNDELETED(0), DELETED(1);
    private final int value;
    DeleteStatus(int value) {
        this.value = value;
    }

    public static DeleteStatus ofValue(boolean value) {
        return value ? DELETED : UNDELETED;
    }
    public static boolean ofFlag(DeleteStatus flag) {
        return DeleteStatus.DELETED == flag ? true : false;
    }
}
