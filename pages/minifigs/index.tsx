import React, { FunctionComponent } from "react";
import Link from "next/link";
import { GetStaticProps } from "next";

interface IProps {
  count: number;
  next: string;
  previous: string;
  minifigs: [
    {
      set_num: string;
      name: string;
      num_parts: number;
      set_img_url: string;
      set_url: string;
    }
  ];
}

const MinifigsMainPage: FunctionComponent<IProps> = ({ count, minifigs }) => {
  return (
    <div>
      <h1>Minifigs Page</h1>
      <div>
        {minifigs.map((minifig) => {
          return (
            <Link href={`/minifigs/${minifig.set_num}`} key={minifig.set_num}>
              <a>{minifig.set_num}</a>
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

export default MinifigsMainPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const res = await fetch(
    `${process.env.REBRICKABLE_URL}minifigs/?key=${process.env.REBRICKABLE_API_KEY}`
  );
  const data = await res.json();
  return {
    props: {
      minifigs: data.results,
      count: data.count,
    },
  };
};
