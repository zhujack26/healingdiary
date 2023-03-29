package com.ssafy.healingdiary.global.error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.client.HttpClientErrorException;

@Getter
@AllArgsConstructor
public enum ErrorCode {


    BAD_REQUEST(HttpStatus.BAD_REQUEST, -1,"잘못된 요청입니다."),
    METHOD_NOT_ALLOWED(HttpStatus.METHOD_NOT_ALLOWED, -2,"허용되지 않은 메서드입니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, -3,"내부 서버 오류입니다."),
    FORBIDDEN(HttpStatus.FORBIDDEN, -4, "권한이 없는 사용자입니다."),
    ENTITY_NOT_FOUND(HttpStatus.OK, -5,"엔티티를 찾을 수 없습니다."),
    COMMENT_NOT_FOUND(HttpStatus.OK, -6,"댓글을 찾을 수 없습니다."),
    NOT_FOUND_USER(HttpStatus.OK, -7,"사용자를 찾을 수 없습니다."),
    NOT_FOUND_CLUB(HttpStatus.OK, -8,"소모임 정보를 찾을 수 없습니다."),
    NOT_VALID_TOKEN(HttpStatus.UNAUTHORIZED, -9,"토큰이 유효하지 않습니다."),
    NOT_FOUND_DATA(HttpStatus.OK, -10,"요청하신 데이터가 없습니다."),


    CONFLICT(HttpStatus.CONFLICT, -409, "이미 가입된 회원입니다.");

    private final HttpStatus status;
    private final int code;
    private final String message;
}
