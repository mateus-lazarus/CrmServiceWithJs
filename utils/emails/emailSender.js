import nodemailer from 'nodemailer';

export const emailSender = (to, subject, text) => {
   const transporter = nodemailer.createTransport({
      service: process.env.MailerService,
      auth: {
         user: process.env.MailerService_User,
         pass: process.env.MailerService_Password
      }
   });
   
   const mailOptions = {
      from: 'Your Favorite CRM <bestcrm@gmail.com>',
      to: to,
      subject: subject,
      text: `<h1>${subject}</h1><hr></hr><h5>${text}</h5>` // Can use some simplest html to format email visual
   };
   
   transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
         console.error('Error:', error);
         throw error;
      } else {
         console.log('Email sent:', info.response);
      }
   });
};

