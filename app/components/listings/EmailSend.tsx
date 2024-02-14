"use server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { SafeUser } from "@/app/types";
import nodemailer from "nodemailer";

export async function send(user: SafeUser) {
  const currentUser = await getCurrentUser();
  console.log("hlo mf");

  const to = user.email;
  const stringifiedTo = JSON.stringify(to);
  await sendMail(
    stringifiedTo,
    "yash",
    "test mail",

    `<h1>hello from ${currentUser?.email}<h1/>`
  );

  async function sendMail(
    to: string,
    name: string,
    subject: string,
    body: string
  ) {
    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    console.log(typeof SMTP_PASSWORD);
    console.log(typeof SMTP_EMAIL);

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    try {
      const testResult = await transport.verify();
      console.log(testResult);
    } catch (error) {
      console.error({ error });
      return;
    }

    try {
      const sendResult = await transport.sendMail({
        from: SMTP_EMAIL,
        to,
        subject,
        html: body,
      });
      console.log(sendResult);
    } catch (error) {
      console.log(error);
    }
  }
}
