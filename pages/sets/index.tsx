import React, { FunctionComponent } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Pagination from "../../components/pagination";
import Header from "../../components/header";

interface IProps {
  count: number;
  currentPage: number;
  sets: [
    {
      set_num: string;
      name: string;
      year: number;
      theme_id: number;
      num_parts: number;
      set_img_url: string;
      set_url: string;
    }
  ];
}

const SetsMainPage: FunctionComponent<IProps> = ({
  count,
  currentPage,
  sets,
}) => {
  return (
    <div>
      <Header />
      <main>
        <Pagination category="sets" currentPage={currentPage} count={count} />
        <div className="container">
          {sets.map((set) => {
            return (
              <Link href={`/sets/set/${set.set_num}`} key={set.set_num}>
                <a>
                  <div className="card">
                    <div className="miniature">
                      <img src={set.set_img_url} alt={set.name} />
                    </div>
                    <div>
                      <h4>{set.name}</h4>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        <Pagination category="sets" currentPage={currentPage} count={count} />
        <Link href="/">
          <a>Main Page</a>
        </Link>
      </main>
      <footer>© 2021 Copyright by Robert Skrzypczak</footer>
    </div>
  );
};

export default SetsMainPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const curPage = context.params?.currentPage as string;
  const currentPage = parseInt(curPage, 10);

  const data = await getDataFromAPI({
    folder: "sets",
    page: currentPage,
  });
  return {
    props: {
      sets: data.results,
      count: data.count,
      currentPage,
    },
  };
};
