// whatsapp.js
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export const sendWhatsApp = async (message) => {
  try {
    await axios.post(`https://api.callmebot.com/whatsapp.php`, null, {
      params: {
        phone: process.env.WHATSAPP_PHONE,
        text: message,
        apikey: process.env.WHATSAPP_API_KEY,
      },
    });
  } catch (error) {
    console.error("WhatsApp send error:", error.message);
  }
};
