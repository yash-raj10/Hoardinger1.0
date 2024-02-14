import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getListings from "../actions/getListings";
import PropertiesClient from "./PropertiesClient";

type Props = {};

async function PropertiesPage({}: Props) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const Listings = await getListings({ userId: currentUser.id });
  //   console.log(Listings);

  if (Listings.length === 0) {
    return (
      <EmptyState
        title="No Hoardings found."
        subtitle="You have no Registered Hoardings!"
      />
    );
  }

  return (
    <div>
      <PropertiesClient listings={Listings} currentUser={currentUser} />
    </div>
  );
}

export default PropertiesPage;
