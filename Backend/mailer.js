import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail", // or any other service
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async ({ subject, body, attachment }) => {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_RECEIVER,
    subject,
    text: body || "boyd",
    attachments: attachment ? [attachment] : [],
  };

  await transporter.sendMail(mailOptions);
};
