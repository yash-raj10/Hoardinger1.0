"use client";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import React from "react";
import Heading from "../Heading";
import Image from "next/image";

interface ListingHeadProps {
  title: string;
  locationValue: string;
  imageSrc: string;
  id: string;
  currentUser?: SafeUser | null;
}

function ListingHead({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser,
}: ListingHeadProps) {
  const { getByValue } = useCountries();

  const location = getByValue(locationValue);

  return (
    <div className="p-5">
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label} `}
      />
      <div className="w-full h-[60vh] overflow-hidden rounded-xl  ">
        <Image
          alt="Image"
          src={imageSrc}
          width={500}
          height={300}
          className="object-cover w-full"
        />
      </div>
    </div>
  );
}

export default ListingHead;
