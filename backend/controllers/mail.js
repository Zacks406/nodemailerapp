const express = require('express');
const router = express.Router();
const Authentication = require('../middleware/auth');
const Mail = require('../models/mail');
const nodemailer = require('nodemailer');
const path = require('path');
const handleBars = require('handlebars');
const fs = require('fs');

const sendMail = (data) => {
  const filePath = path.join(__dirname, '../template/mail.html');
  const source = fs.readFileSync(filePath, 'utf-8').toString();
  const html = handleBars.compile(source);
  const replacements = {
    content: data,
  };
  const template = html(replacements);
  return template;
};

//send email route
router.post('/compose', Authentication, async (req, res, next) => {
  const { emailTo, subject, description, filePassword, imageUrl } = req.body;
  if (emailTo && subject) {
    try {
      const results = await Mail({
        userId: req.userId,
        emailTo,
        subject,
        description,
        filePassword,
        imageUrl,
      }).save();
      console.log(results._id);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '587',
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false,
        auth: {
          user: process.env.OUTLOOK_MAIL, // email user
          pass: process.env.OUTLOOK_PASSWORD, // email password
        },
      });

      //const html = sendMail(description);

      const options = {
        from: process.env.OUTLOOK_MAIL,
        to: emailTo,
        subject,
        html: `<h2>Hello ${emailTo} </h2>
        <p>Kindly find attached  ${description} file from <strong>Zeenet</strong> </p>
  
          <p style="margin-bottom:20px;">Click the link below to download your file at your download page</p>

          <p> Your File Password is: <strong> ${filePassword}</strong>.</p>
  
          <a href= http://localhost:3000/download/${results._id}  style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Decript</a>

          <p style="margin-bottom:0px;">Thank you</p>
          <strong>Zeenet Team</strong>
               `,
      };
      await transporter.sendMail(options).catch((error) => console.log(error));
      res.send({
        user: {
          message: 'Email Sent Successfully',
        },
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error Occured',
        error: error,
      });
    }
  } else {
    res.status(500).json({
      message: "Email won't be empty",
    });
  }
});

router.get('/singleMail', async (req, res) => {
  try {
    const result = await Mail.findOne({ emailTo: req.body.emailTo });
    res.send({ result });
    {
      /*
    return res.json({
      user: {
        uid: result._id,
        email: result.emailTo,
      },
      message: 'Authentication Successfull',
    });
    */
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Occured',
      error: error,
    });
  }
});

//single emails
router.get('/allMails/:id', async (req, res) => {
  const userId = req.params.id;
  try {
    const result = await Mail.findById(userId).lean();
    res.send({ result });
  } catch (error) {
    res.status(500).json({
      message: 'Error Occured',
      error: error,
    });
  }
});

router.get('/allMails', Authentication, async (req, res, next) => {
  const userId = req?.userId;
  try {
    const result = await Mail.find({ userId });

    res.send({ result });
  } catch (error) {
    res.status(500).json({
      message: 'Error Occured',
      error: error,
    });
  }
});

module.exports = router;
