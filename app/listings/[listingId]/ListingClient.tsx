import ListingHead from "@/app/components/listings/ListingHead";
import { ListingInfo } from "@/app/components/listings/ListingInfo";
import { SafeListing, SafeUser } from "@/app/types";
import { Reservition } from "@prisma/client";

interface ListingClientProps {
  reservations?: Reservition[];
  listing: SafeListing & {
    user: SafeUser;
  };

  currentUser?: SafeUser | null;
}

const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
  return (
    <div className="max-w-screen-lg mx-auto ">
      <div className="flex flex-col gap-6">
        <ListingHead
          title={listing.title}
          imageSrc={listing.imageSrc}
          locationValue={listing.locationValue}
          id={listing.id}
          currentUser={currentUser}
        />

        <div className=" grid grid-cols-1  md:grid-cols-1 md:gap-10 mt-6">
          <ListingInfo
            user={listing.user}
            description={listing.description}
            monthCount={listing.monthCount}
            locationValue={listing.locationValue}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingClient;
