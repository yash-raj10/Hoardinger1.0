export const dynamic = "force-dynamic";

import Image from "next/image";
import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingParams } from "./actions/getListings";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import mapPin from "@/public/mapPin.gif";

interface HomeProps {
  searchParams: IListingParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <>
      <div className=" bg-green-400 flex flex-col lg:flex-row md:flex-row justify-around pt-10 pb-4 md:pb-0  lg:pb-0 px-8">
        <div className=" md:p-16  lg:p-16 m-4 md:m-0 lg:m-0  ">
          <p className="md:text-3xl lg:text-3xl text-2xl font-semibold py-3 md:py-3 lg:py-7 text-center ">
            Hoardinger- Rent/List Hoardings!
          </p>
          <p className="md:text-xl font-medium text-base rounded-3xl p-3 bg-white">
            Hoardinger is designed for individuals and government entities to
            rent out hoarding spaces, including home walls, empty places,
            banners on roads, highways, restaurants. This platform facilitates
            the connection between those offering hoarding spaces and Small
            Businesses / individuals / Companies looking to rent them on a
            monthly basis.
          </p>
        </div>
        <Image
          className=" hidden  lg:flex h-80 w-80 mr-8 my-8 sm:ml-0 ml-10"
          alt="kk"
          height={80}
          width={80}
          src={mapPin}
        />
      </div>
      <div className="  pt-8 px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          return (
            <ListingCard
              currentUser={currentUser}
              key={listing.id}
              data={listing}
            />
          );
        })}
      </div>
    </>
  );
}
