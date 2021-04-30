import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataFromAPI from "../../../middleware/fetch";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Link from "next/link";

interface IProps {
  set: {
    set_num: string;
    name: string;
    year: number;
    theme_id: number;
    num_parts: number;
    set_img_url: string;
    set_url: string;
  };
}

const Page: FunctionComponent<IProps> = ({ set }) => {
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
              <img src={set.set_img_url} alt={set.name} />
            </div>
            <div className="item-description">
              <span>Set number: {set.set_num}</span>
              <span>Name: {set.name}</span>
              <span>Year: {set.year}</span>
              <span>
                <Link href={set.set_url}>Rebrickable link</Link>
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
  const data = await getDataFromAPI({ folder: "sets" });

  const paths = data.results.map((set: any) => ({
    params: {
      id: set.set_num,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (typeof params !== "undefined") {
    const data = await getDataFromAPI({
      folder: "sets",
      id: params.id?.toString(),
    });
    return {
      props: {
        set: data,
      },
    };
  }
  return { props: {} };
};
