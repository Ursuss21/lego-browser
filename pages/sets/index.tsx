import React, { FunctionComponent } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

interface IProps {
  count: number;
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

const SetsMainPage: FunctionComponent<IProps> = ({ count, sets }) => {
  console.log(count);
  return (
    <div>
      <h1>Sets Page</h1>
      <div>
        {sets.map((set) => {
          return <div key={set.set_num}>{set.set_num}</div>;
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
  const res = await fetch(
    `${process.env.REBRICKABLE_URL}sets/?key=${process.env.REBRICKABLE_API_KEY}`
  );
  const data = await res.json();
  console.log(data.results);
  return {
    props: {
      sets: data.results,
      count: data.count,
    },
  };
};
