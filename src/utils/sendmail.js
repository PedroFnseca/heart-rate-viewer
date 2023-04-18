import nodeMailer from "nodemailer"
import { warningMail } from "./templateMails"

function createTransporter(){
  return nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PWD_APP
    },
    tls: {
      rejectUnauthorized: false
    }
  })
}
 
export async function sendMailHTML(to, subject, html) {

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  }

  await createTransporter().sendMail(mailOptions)
}

export async function sendWarningMail(to, emergency_contact_name, username){
  const subject = "Alerta de emergência"
  
  const html = warningMail(emergency_contact_name, username)

  await sendMailHTML(to, subject, html)
}