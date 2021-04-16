import React, { FunctionComponent } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Pagination from "../../components/pagination";

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
      <h1>Sets Page</h1>
      <div>
        {sets.map((set) => {
          return (
            <Link href={`/sets/set/${set.set_num}`} key={set.set_num}>
              <a>{set.set_num}</a>
            </Link>
          );
        })}
      </div>
      <Pagination currentPage={currentPage} count={count} />
      <Link href="/">
        <a>Main Page</a>
      </Link>
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
