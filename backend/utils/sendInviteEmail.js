
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendInviteEmail = async (email, boardName, inviteCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Invitation to join board "${boardName}"`,
    html: `<p>You have been invited to join <strong>${boardName}</strong>.</p>
           <p>Use this invite code: <code>${inviteCode}</code></p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendInviteEmail;
