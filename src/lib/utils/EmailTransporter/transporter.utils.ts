"use server";
/**
 * This File exports the Email Transporter Helper For the App
 * */
import nodemailer from "nodemailer";

export const initTransporter = async () => {
    return await nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};