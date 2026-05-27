package com.debjit.nexkart_auth.exceptions;

public class AuthException extends RuntimeException {
    private String errorCode;

    public AuthException(String message) {
        super(message);
        this.errorCode = "AUTH_ERROR";
    }

    public AuthException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}