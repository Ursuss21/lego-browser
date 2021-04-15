import React, { FunctionComponent } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";
import getDataFromAPI from "../../middleware/fetch";

interface IProps {
  count: number;
  next: string;
  previous: string;
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
  currentPage: string;
}

const SetsMainPage: FunctionComponent<IProps> = ({
  count,
  next,
  previous,
  sets,
  currentPage,
}) => {
  const numberOfPages = Math.ceil(count / 100);
  console.log(`number of pages: ${numberOfPages}`);

  const pagination = Array(7)
    .fill("")
    .map((_, index) => {
      const idx = Number(currentPage) + index;
      return idx.toString();
    });
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
      <div className="pagination">
        {pagination.map((page) => {
          if (currentPage === page) {
            return (
              <Link href={`/sets/${page}`} key={page}>
                <a className="active">{page}</a>
              </Link>
            );
          } else {
            return (
              <Link href={`/sets/${page}`} key={page}>
                <a>{page}</a>
              </Link>
            );
          }
        })}
      </div>
      <Link href="/">
        <a>Main Page</a>
      </Link>
    </div>
  );
};

export default SetsMainPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const currentPage = context.params?.currentPage as string;

  const data = await getDataFromAPI({
    folder: "sets",
    page: currentPage,
  });
  return {
    props: {
      sets: data.results,
      next: data.next,
      previous: data.previous,
      count: data.count,
      currentPage,
    },
  };
};
