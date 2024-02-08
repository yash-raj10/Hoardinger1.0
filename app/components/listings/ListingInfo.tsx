import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  monthCount: number;
  locationValue: string;
}

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

export default function ListingInfo({
  user,
  description,
  monthCount,
  locationValue,
}: ListingInfoProps) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

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
    </div>
  );
}
