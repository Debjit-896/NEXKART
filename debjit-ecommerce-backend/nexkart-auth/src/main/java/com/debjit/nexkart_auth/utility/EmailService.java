package com.debjit.nexkart_auth.utility;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    /**
     * Send OTP for Forgot Password / Login Verification
     */
    public void sendPasswordResetOtp(String recipientEmail, String customerName, String otpCode) {
        String subject = "🔒 Security Alert: [" + otpCode + "] Is your NexKart verification code";

        String descriptionHtml = "Please find your <span style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: 600; color: #854d0e;\">One Time Password (OTP)</span> for verification below:";
        String warningHtml = "This <span style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: 600; color: #854d0e;\">OTP</span> will be used to verify your request. For account security, do not share your <span style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: 600; color: #854d0e;\">OTP</span> with anyone.";
        int expiryMinutes = 10;

        sendBaseEmailTemplate(recipientEmail, customerName, otpCode, subject, descriptionHtml, warningHtml, expiryMinutes);
    }

    /**
     * Send OTP for Account Creation Sign-up Welcome Verification
     */
    public void sendVerificationOtp(String recipientEmail, String customerName, String otpCode) {
        String subject = "🎉 Welcome to NexKart! Verify your account [" + otpCode + "]";

        String descriptionHtml = "Welcome to NexKart!<br>Please use the following <span style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: 600; color: #854d0e;\">One Time Password (OTP)</span> to verify your account:";
        String warningHtml = "For your account security, never share this <span style=\"background-color: #fef08a; padding: 2px 4px; border-radius: 4px; font-weight: 600; color: #854d0e;\">OTP</span> with anyone.";
        int expiryMinutes = 10;

        sendBaseEmailTemplate(recipientEmail, customerName, otpCode, subject, descriptionHtml, warningHtml, expiryMinutes);
    }

    /**
     * Core Private Template Engine (Builds HTML frame & embeds local resource logo)
     */
    private void sendBaseEmailTemplate(String recipientEmail, String customerName, String otpCode,
                                       String subject, String descriptionHtml, String warningHtml, int expiryMinutes) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail, "NexKart System");
            helper.setTo(recipientEmail);
            helper.setSubject(subject);

            String htmlContent = String.format(
                    "<!DOCTYPE html>\n" +
                            "<html>\n" +
                            "<head>\n" +
                            "    <meta charset=\"UTF-8\">\n" +
                            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                            "</head>\n" +
                            "<body style=\"margin: 0; padding: 0; background-color: #1e293b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;\">\n" +
                            "    \n" +
                            "    <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%%\" style=\"background-color: #1e293b; padding: 30px 15px;\">\n" +
                            "        <tr>\n" +
                            "            <td align=\"center\">\n" +
                            "                \n" +
                            "                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%%\" style=\"max-width: 520px; background-color: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.3);\">\n" +
                            "                    \n" +
                            "                    <!-- HEADER WITH CENTERED LOGO AND TAGLINE -->\n" +
                            "                    <tr>\n" +
                            "                        <td style=\"background-color: #0c1e4e; padding: 24px; text-align: center;\">\n" +
                            "                            <div style=\"text-align: center;\">\n" +
                            "                                <div style=\"font-size: 36px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin-bottom: 8px;\">\n" +
                            "                                    🛒 Nex<span style=\"color: #3b82f6;\">Kart</span>\n" +
                            "                                </div>\n" +
                            "                                <div style=\"font-size: 12px; color: #94a3b8; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; margin-top: 4px;\">\n" +
                            "                                    INDIS'S TRUSTED E-COMMERCE PLATFORM\n" +
                            "                                </div>\n" +
                            "                            </div>\n" +
                            "                        </td>\n" +
                            "                    </tr>\n" +
                            "                    \n" +
                            "                    <!-- CONTENT AREA -->\n" +
                            "                    <tr>\n" +
                            "                        <td style=\"padding: 36px 32px; background-color: #ffffff;\">\n" +
                            "                            \n" +
                            "                            <p style=\"margin: 0 0 18px 0; font-size: 18px; font-weight: 700; color: #0f172a;\">\n" +
                            "                                Hi %s,\n" +
                            "                            </p>\n" +
                            "                            \n" +
                            "                            <p style=\"margin: 0 0 28px 0; font-size: 15px; color: #334155; line-height: 1.6;\">\n" +
                            "                                %s\n" +
                            "                            </p>\n" +
                            "                            \n" +
                            "                            <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%%\" style=\"margin: 24px 0;\">\n" +
                            "                                <tr>\n" +
                            "                                    <td align=\"center\">\n" +
                            "                                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"border: 2px solid #0f172a; border-radius: 12px; background-color: #ffffff;\">\n" +
                            "                                            <tr>\n" +
                            "                                                <td style=\"padding: 10px 48px; font-size: 32px; font-weight: 800; color: #0f172a; letter-spacing: 4px; text-align: center;\">\n" +
                            "                                                    %s\n" +
                            "                                                </td>\n" +
                            "                                            </tr>\n" +
                            "                                        </table>\n" +
                            "                                    </td>\n" +
                            "                                </tr>\n" +
                            "                            </table>\n" +
                            "                            \n" +
                            "                            <p style=\"margin: 28px 0 16px 0; font-size: 14px; color: #334155; font-weight: 500;\">\n" +
                            "                                This OTP is valid for %d minutes.\n" +
                            "                            </p>\n" +
                            "                            \n" +
                            "                            <p style=\"margin: 0 0 36px 0; font-size: 14px; color: #334155; line-height: 1.5;\">\n" +
                            "                                %s\n" +
                            "                            </p>\n" +
                            "                            \n" +
                            "                            <p style=\"margin: 0; font-size: 15px; color: #0f172a; font-weight: 600;\">\n" +
                            "                                Regards,\n" +
                            "                            </p>\n" +
                            "                            <p style=\"margin: 4px 0 0 0; font-size: 15px; color: #2563eb; font-weight: 700;\">\n" +
                            "                                Team NexKart\n" +
                            "                            </p>\n" +
                            "                        </td>\n" +
                            "                    </tr>\n" +
                            "                    \n" +
                            "                    <!-- FOOTER -->\n" +
                            "                    <tr>\n" +
                            "                        <td style=\"background-color: #0f172a; padding: 14px; text-align: center; font-size: 11px; color: #94a3b8; font-weight: 500; border-top: 1px solid #f1f5f9;\">\n" +
                            "                            🛡️ ISO/IEC 27001 Certified • Secure Transaction Engine\n" +
                            "                        </td>\n" +
                            "                    </tr>\n" +
                            "                    \n" +
                            "                </table>\n" +
                            "                \n" +
                            "            </td>\n" +
                            "        </tr>\n" +
                            "    </table>\n" +
                            "</body>\n" +
                            "</html>",
                    customerName, descriptionHtml, otpCode, expiryMinutes, warningHtml
            );

            helper.setText(htmlContent, true);
            mailSender.send(message);

            log.info("Email sent successfully to: {}", recipientEmail);
        } catch (Exception e) {
            log.error("Failed to send email to {}: {}", recipientEmail, e.getMessage(), e);
            throw new RuntimeException("Failed compiling email notification layout template: " + e.getMessage());
        }
    }
}