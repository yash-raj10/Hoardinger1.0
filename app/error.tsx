"use client";

import React, { useEffect } from "react";
import EmptyState from "./components/EmptyState";

type Props = {
  error: Error;
};

const ErrorState = (error: Props) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <EmptyState
      title="AAhhh.., Hey"
      subtitle="I guess, Something went wrong!"
    />
  );
};

export default ErrorState;
