
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
          user: "habittrackerrr@gmail.com",
          pass: "hdht cazt gwaq qbpe",
        },
    });
    

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'habittrackerrr@gmail.com', // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      text: text // Plain text body
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

