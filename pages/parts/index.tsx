import React, { FunctionComponent } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

interface IProps {
  count: number;
  next: string;
  previous: string;
  parts: [
    {
      part_num: string;
      name: string;
      part_cat_id: number;
      part_url: string;
      part_img_url: string;
    }
  ];
}

const PartsMainPage: FunctionComponent<IProps> = ({ count, parts }) => {
  return (
    <div>
      <h1>Parts Page</h1>
      <div>
        {parts.map((part) => {
          return (
            <Link href={`/parts/${part.part_num}`} key={part.part_num}>
              <a>{part.part_num}</a>
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

export default PartsMainPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `${process.env.REBRICKABLE_URL}parts/?key=${process.env.REBRICKABLE_API_KEY}`
  );
  const data = await res.json();
  return {
    props: {
      parts: data.results,
      count: data.count,
    },
  };
};
