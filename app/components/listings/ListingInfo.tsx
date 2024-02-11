import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import nodemailer from "nodemailer";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  monthCount: number;
  locationValue: string;
}

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

export function ListingInfo({
  user,
  description,
  monthCount,
  locationValue,
}: ListingInfoProps) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;
  //------------------------------------------------------------------

  const send = async () => {
    "use server";
    const to = user.email;
    const stringifiedTo = JSON.stringify(to);
    await sendMail(
      stringifiedTo,
      "yash",
      "test mail",
      `<h1>hello ${user.email}<h1/>`
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
  };

  // -------------------------------------------------------------------------

  return (
    <div className="col-span-4 flex flex-col gap-8 p-5">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Image
            className="rounded-full"
            height="40"
            width="40"
            alt="Avatar"
            src={user?.image || "/images/placeholder.jpg"}
          />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{monthCount} Months</div>
        </div>
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
      <hr />
      <form>
        <button formAction={send}>email</button>
      </form>
    </div>
  );
}
