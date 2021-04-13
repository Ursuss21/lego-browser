import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

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
  const url = process.env.REBRICKABLE_URL;
  const key = process.env.REBRICKABLE_API_KEY;

  const res = await fetch(`${url}minifigs/?key=${key}`);
  const data = await res.json();

  const paths = data.results.map((minifig: any) => ({
    params: {
      id: minifig.set_num,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params !== "undefined") {
    const url = process.env.REBRICKABLE_URL;
    const key = process.env.REBRICKABLE_API_KEY;

    const res = await fetch(`${url}minifigs/${params.id}/?key=${key}`);
    const data = await res.json();

    return {
      props: {
        minifigs: data,
      },
    };
  }
  return { props: {} };
};
