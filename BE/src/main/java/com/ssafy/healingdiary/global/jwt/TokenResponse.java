package com.ssafy.healingdiary.global.jwt;

import com.ssafy.healingdiary.global.error.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

public class TokenResponse {
    @Getter
    @Builder
    private static class Body {

        private int state;
        private String result;
        private String message;
        private Object data;
        private Object error;
    }
    public static Body reissue() {
        return Body.builder()
                .state(HttpStatus.UNAUTHORIZED.value())
                .message(ErrorCode.ACCESS_TOKEN_EXPIRED.getMessage())
                .error("TOKEN-0001")
                .build();
    }
}
