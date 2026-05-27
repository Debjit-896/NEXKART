package com.debjit.nexkart_auth.utility;

import org.springframework.stereotype.Component;
import java.util.Random;

@Component
public class OtpGenerator {
    private static final Random random = new Random();

    public String generateOtp() {
        int otp = 100000 + random.nextInt(900000);
        return String.valueOf(otp);
    }

    public long getExpirationTimeInMinutes(long minutes) {
        return System.currentTimeMillis() + (minutes * 60 * 1000);
    }
}