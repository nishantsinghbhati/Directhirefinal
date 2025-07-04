import { google } from "googleapis";
import stream from "stream";

import express from "express";
import dotenv from "dotenv";

dotenv.config(); // ✅ Loads variables from .env






const SERVICE_ACCOUNT_FILE = JSON.parse(
  Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_BASE64, 'base64').toString('utf8')
);

async function uploadToGoogleDrive(file) {
  const auth = new google.auth.GoogleAuth({
    credentials: SERVICE_ACCOUNT_FILE,
    scopes: ["https://www.googleapis.com/auth/drive"]
  });

  const drive = google.drive({ version: "v3", auth });

  // ✅ Convert buffer to stream
  const bufferStream = new stream.PassThrough();
  bufferStream.end(file.buffer);

  const res = await drive.files.create({
    requestBody: {
      name: file.originalname,
      parents: [process.env.FOLDER_ID],
    },
    media: {
      mimeType: file.mimetype,
      body: bufferStream, // ✅ MUST be a stream
    },
    fields: "id, name"
  });

  // Make file public
  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: {
      role: "reader",
      type: "anyone"
    }
  });

  const publicUrl = `https://drive.google.com/uc?id=${res.data.id}&export=download`;
  return { link: publicUrl, filename: res.data.name };
}
 


export default uploadToGoogleDrive; 