import React, { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Header from "../../components/header";
import ItemsOnPage from "../../components/itemsOnPage";
import Pagination from "../../components/pagination";
import Card from "../../components/card";
import Footer from "../../components/footer";

interface IProps {
  parts: [
    {
      part_num: string;
      name: string;
      part_cat_id: number;
      part_url: string;
      part_img_url: string;
    }
  ];
  partsCount: number;
  currentPage: number;
  pageSize: number;
}

const PartsMainPage: FunctionComponent<IProps> = ({
  parts,
  partsCount,
  currentPage,
  pageSize,
}) => {
  return (
    <div>
      <Header />
      <main>
        <div className="filter-options">
          <ItemsOnPage />
        </div>
        <Pagination
          category="parts"
          currentPage={currentPage}
          itemsCount={partsCount}
          pageSize={pageSize}
        />
        <div className="card-container">
          {parts.map((part) => {
            return (
              <Card
                path="/sets/set/"
                num={part.part_num}
                img_url={part.part_img_url}
                name={part.name}
                key={part.part_num}
              />
            );
          })}
        </div>
        <Pagination
          category="parts"
          currentPage={currentPage}
          itemsCount={partsCount}
          pageSize={pageSize}
        />
      </main>
      <Footer />
    </div>
  );
};

export default PartsMainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const curPage = context.params?.currentPage as string;
  const currentPage = parseInt(curPage, 10) || 1;

  const pgSize = context.query.page_size as string;
  const pageSize = parseInt(pgSize, 10) || 20;

  console.log(context.query);
  const partsData = await getDataFromAPI({
    folder: "parts",
    page: currentPage,
    page_size: pageSize,
  });

  return {
    props: {
      parts: partsData.results,
      partsCount: partsData.count,
      currentPage,
      pageSize,
    },
  };
};
