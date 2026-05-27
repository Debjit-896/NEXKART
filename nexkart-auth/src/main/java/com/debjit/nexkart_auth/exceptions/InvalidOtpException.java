package com.debjit.nexkart_auth.exceptions;

public class InvalidOtpException extends RuntimeException {
    private String errorCode;

    public InvalidOtpException(String message) {
        super(message);
        this.errorCode = "INVALID_OTP";
    }

    public InvalidOtpException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}