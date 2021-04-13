import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataFromAPI from "../../../middleware/fetch";

const Page = () => {
  const router = useRouter();

  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading</div>;
  } else {
    return <div>Minifig {id}</div>;
  }
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getDataFromAPI({ folder: "minifigs", page: "1" });

  const paths = data.results.map((minifig: any) => ({
    params: {
      id: minifig.set_num,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params !== "undefined") {
    const data = await getDataFromAPI({
      folder: "minifigs",
      id: params.id?.toString(),
    });

    return {
      props: {
        minifigs: data,
      },
    };
  }
  return { props: {} };
};
