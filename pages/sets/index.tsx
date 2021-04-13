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
}

const SetsMainPage: FunctionComponent<IProps> = ({
  count,
  next,
  previous,
  sets,
}) => {
  return (
    <div>
      <h1>Sets Page</h1>
      <div>
        {sets.map((set) => {
          return (
            <Link href={`/sets/${set.set_num}`} key={set.set_num}>
              <a>{set.set_num}</a>
            </Link>
          );
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
  const data = await getDataFromAPI({ folder: "sets", page: "1" });
  return {
    props: {
      sets: data.results,
      next: data.next,
      previous: data.previous,
      count: data.count,
    },
  };
};
