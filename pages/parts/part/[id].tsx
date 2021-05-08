import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataFromAPI from "../../../middleware/fetch";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Link from "next/link";

interface IProps {
  part: {
    part_num: string;
    name: string;
    part_cat_id: number;
    part_img_url: string;
    part_url: string;
  };
}

const Page: FunctionComponent<IProps> = ({ part }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <Header />
        <main>
          <div className="item-container">
            <div className="item-image">
              <img src={part.part_img_url} alt={part.name} />
            </div>
            <div className="item-description">
              <span>Part number: {part.part_num}</span>
              <span>Name: {part.name}</span>
              <span>
                <Link href={part.part_url}>Rebrickable link</Link>
              </span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getDataFromAPI({ folder: "parts" });

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
        part: data,
      },
    };
  }
  return { props: {} };
};
