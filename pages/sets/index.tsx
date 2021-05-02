import React, { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Pagination from "../../components/pagination";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Card from "../../components/card";
import Dropdown from "../../components/dropdown";

interface IProps {
  count: number;
  currentPage: number;
  pageSize: number;
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
  pageSize,
  sets,
}) => {
  return (
    <div>
      <Header />
      <main>
        <Pagination
          category="sets"
          currentPage={currentPage}
          count={count}
          pageSize={pageSize}
        />
        <Dropdown />
        <div className="card-container">
          {sets.map((set) => {
            return (
              <Card
                path="/sets/set/"
                num={set.set_num}
                img_url={set.set_img_url}
                name={set.name}
                key={set.set_num}
              />
            );
          })}
        </div>
        <Pagination
          category="sets"
          currentPage={currentPage}
          count={count}
          pageSize={pageSize}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SetsMainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const curPage = context.params?.currentPage as string;
  const currentPage = parseInt(curPage, 10) || 1;

  const pgSize = context.query.page_size as string;
  const pageSize = parseInt(pgSize, 10) || 20;

  console.log(context.query);
  const data = await getDataFromAPI({
    folder: "sets",
    page: currentPage,
    page_size: pageSize,
  });
  return {
    props: {
      sets: data.results,
      count: data.count,
      currentPage,
      pageSize,
    },
  };
};
