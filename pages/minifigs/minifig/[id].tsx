import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import getDataFromAPI from "../../../middleware/fetch";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import Link from "next/link";

interface IProps {
  minifig: {
    set_num: string;
    name: string;
    num_parts: number;
    set_url: string;
    set_img_url: string;
  };
}

const Page: FunctionComponent<IProps> = ({ minifig }) => {
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
              <img src={minifig.set_img_url} alt={minifig.name} />
            </div>
            <div className="item-description">
              <span>Minifig number: {minifig.set_num}</span>
              <span>Name: {minifig.name}</span>
              <span>
                <Link href={minifig.set_url}>Rebrickable link</Link>
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
  const data = await getDataFromAPI({ folder: "minifigs" });

  const paths = data.results.map((minifig: any) => ({
    params: {
      id: minifig.set_num,
    },
  }));
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params !== undefined) {
    const data = await getDataFromAPI({
      folder: "minifigs",
      id: params.id?.toString(),
    });
    return {
      props: {
        minifig: data,
      },
    };
  }
  return { props: {} };
};
