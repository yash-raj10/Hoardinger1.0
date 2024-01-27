"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

function EmptyState({
  title = "No Listings!",
  subtitle = "Refresh the page",
  showReset,
}: EmptyState) {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading centre title={title} subtitle={subtitle} />
      <div className=" w-48 mt-4">
        {showReset && (
          <Button outline label="Refresh" onClick={() => router.push("/")} />
        )}
      </div>
    </div>
  );
}

export default EmptyState;
