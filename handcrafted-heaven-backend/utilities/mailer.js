const { google } = require("googleapis");

// 1. Initialize the Google OAuth2 client for pure HTTP requests
const oauth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground",
);

oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH_REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oauth2Client });

// 2. Create a mock transporter object that mimics Nodemailer
const transporter = {
  /**
   * Drops directly into your existing codebase replacing nodemailer.sendMail
   * @param {Object} mailOptions - { to, subject, text, html }
   */
  sendMail: async (mailOptions) => {
    try {
      const { to, subject, text, html } = mailOptions;

      // Encode subject line safely to handle special characters
      const utf8Subject = `=?utf-8?B?${Buffer.from(subject || "").toString("base64")}?=`;

      // Construct the raw RFC 2822 email packet
      const messageParts = [
        `From: ${process.env.MAIL_USER}`,
        `To: ${to}`,
        `Content-Type: text/html; charset=utf-8`,
        `MIME-Version: 1.0`,
        `Subject: ${utf8Subject}`,
        ``,
        html || text || "",
      ];
      const message = messageParts.join("\n");

      // Safely convert to base64url format required by Google API
      const encodedMessage = Buffer.from(message)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

      // Send via standard HTTPS POST on port 443 (Allowed by Render)
      const response = await gmail.users.messages.send({
        userId: "me",
        requestBody: {
          raw: encodedMessage,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Gmail API Drop-in Transporter Error:", error);
      throw error;
    }
  },
};

// Export it exactly as before
module.exports = transporter;
