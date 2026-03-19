"use server";
/**
 * This File exports the Email Transporter Helper For the App
 * */
import nodemailer from "nodemailer";

export const initTransporter = async () => {
    if(process.env.SEND_MAIL_FOR_DEVELOPMENT || process.env.NODE_ENV === "production") {
        return await nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT as string),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    } else {
        console.warn(
            "Mail Transport Is Disabled For Current Development Environment. Please Review " +
            ".env.development if you would like to test email sending..."
        );
        return null;
    }
};