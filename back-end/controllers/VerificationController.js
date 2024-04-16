//password and email in env
const env = process.env.NODE_ENV;
const email = process.env.EMAIL
const password = process.env.EMAILPASS
//sends an email
const nodemailer = require('nodemailer');

// Sends an email
exports.sendEmail = async (req, res) => {
  try {
    // Extracting necessary details from the request
    const { to, subject, text } = req.body;

    // Create a transporter with Gmail SMTP settings
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: email,
          pass: password,
        },
    });
    

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: email, // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      html: text // Plain text body
      // You can also include HTML content by adding: html: '<b>Hello world?</b>'
    });

    console.log('Message sent: %s', info.messageId);
    
    // Sending success response
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Error occurred while sending email:', err);
    // Sending error response
    res.status(500).json({ error: 'An error occurred while sending email' });
  }
};

