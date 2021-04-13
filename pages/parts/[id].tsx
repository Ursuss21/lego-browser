import React from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataFromAPI from "../../middleware/fetch";

const Page = () => {
  const router = useRouter();

  const { id } = router.query;

  if (router.isFallback) {
    return <div>Loading</div>;
  } else {
    return <div>Part {id}</div>;
  }
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getDataFromAPI({ folder: "parts", page: "1" });

  const paths = data.results.map((part: any) => ({
    params: {
      id: part.part_num,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params !== "undefined") {
    const data = await getDataFromAPI({
      folder: "parts",
      id: params.id?.toString(),
    });

    return {
      props: {
        sets: data,
      },
    };
  }
  return { props: {} };
};
