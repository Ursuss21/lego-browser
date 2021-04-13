import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";

const Page = () => {
  const router = useRouter();

  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading</div>;
  } else {
    return <div>Set {id}</div>;
  }
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const url = process.env.REBRICKABLE_URL;
  const key = process.env.REBRICKABLE_API_KEY;

  const res = await fetch(`${url}sets/?key=${key}`);
  const data = await res.json();

  const paths = data.results.map((set: any) => ({
    params: {
      id: set.set_num,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params !== "undefined") {
    const url = process.env.REBRICKABLE_URL;
    const key = process.env.REBRICKABLE_API_KEY;

    const res = await fetch(`${url}sets/${params.id}/?key=${key}`);
    const data = await res.json();

    return {
      props: {
        sets: data,
      },
    };
  }
  return { props: {} };
};
