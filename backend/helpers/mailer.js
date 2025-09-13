import express from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config();

const user=process.env.USER;
const pass=process.env.PASS;
const to=process.env.TO;

const app=express();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: user,
    pass: pass
  },
});

async function sendMail(email,msg){
    const info=await transporter.sendMail({
        to:to,
        subject:`A message from the user ${email}`,
        html:msg,
    });
    return info;
}

export default sendMail

