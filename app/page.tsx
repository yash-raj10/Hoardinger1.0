import getListings from "./actions/getListings";
import EmptyState from "./components/EmptyState";

export default async function Home() {
  const listings = await getListings();

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <div className=" px-9 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings.map((listings: any) => {
        return <div>{listings.title}</div>;
      })}
    </div>
  );
}
