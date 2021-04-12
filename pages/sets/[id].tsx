import React from "react";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const { id } = router.query;

  return <div>Set {id}</div>;
};

export default Page;
