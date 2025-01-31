const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const { PassThrough } = require('stream');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

// Configure the SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '84b67b001@smtp-brevo.com', // Login
        pass: 'C163JqsT4xREISmB' // Master password
    },
    tls: {
        rejectUnauthorized: false // Allow self-signed certificates
    }
});

app.post('/send-email', async (req, res) => {
  try {
    const { recipientEmail, subject } = req.body;

    // Create a PDF document
    const pdfDoc = new PDFDocument();
    const pdfBuffer = new PassThrough();
    pdfDoc.pipe(pdfBuffer);

    // Add content to the PDF
    pdfDoc.fontSize(25).text('Parenting Assessment Results', { align: 'center' });
    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text('Congratulations! Here are your results:', { align: 'left' });
    pdfDoc.moveDown();
    pdfDoc.text('1. Result One: Excellent');
    pdfDoc.text('2. Result Two: Good');
    pdfDoc.text('3. Result Three: Needs Improvement');

    // Finalize the PDF and end the stream
    pdfDoc.end();

    const mailOptions = {
      from: 'johnmuthee547@gmail.com',
      to: recipientEmail,
      subject: subject || 'Your Parenting Assessment Results',
      text: 'Please find your parenting assessment results attached.',
      attachments: [
        {
          filename: 'parenting-assessment-results.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error.message); // Log the error message
    console.error('Full error details:', error); // Log the full error object
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
