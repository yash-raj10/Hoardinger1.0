import getListingById from "@/app/actions/getListingsById";
import EmptyState from "@/app/components/EmptyState";
import { list } from "postcss";
import React from "react";

interface IParams {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: IParams }) {
  const listing = await getListingById(params);

  if (!listing) {
    return <EmptyState />;
  }

  return <div>{listing.title}</div>;
}
