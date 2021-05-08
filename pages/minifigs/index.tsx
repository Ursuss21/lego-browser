import React, { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Header from "../../components/header";
import ItemsOnPage from "../../components/itemsOnPage";
import Pagination from "../../components/pagination";
import Card from "../../components/card";
import Footer from "../../components/footer";

interface IProps {
  minifigs: [
    {
      set_num: string;
      name: string;
      num_parts: number;
      set_url: string;
      set_img_url: string;
    }
  ];
  minifigsCount: number;
  currentPage: number;
  pageSize: number;
}

const MinifigsMainPage: FunctionComponent<IProps> = ({
  minifigs,
  minifigsCount,
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
          category="minifigs"
          currentPage={currentPage}
          itemsCount={minifigsCount}
          pageSize={pageSize}
        />
        <div className="card-container">
          {minifigs.map((minifig) => {
            return (
              <Card
                path="/minifigs/minifig/"
                num={minifig.set_num}
                img_url={minifig.set_img_url}
                name={minifig.name}
                key={minifig.set_num}
              />
            );
          })}
        </div>
        <Pagination
          category="minifigs"
          currentPage={currentPage}
          itemsCount={minifigsCount}
          pageSize={pageSize}
        />
      </main>
      <Footer />
    </div>
  );
};

export default MinifigsMainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const curPage = context.params?.currentPage as string;
  const currentPage = parseInt(curPage, 10) || 1;

  const pgSize = context.query.page_size as string;
  const pageSize = parseInt(pgSize, 10) || 20;

  const minifigsData = await getDataFromAPI({
    folder: "minifigs",
    page: currentPage,
    page_size: pageSize,
  });

  return {
    props: {
      minifigs: minifigsData.results,
      minifigsCount: minifigsData.count,
      currentPage,
      pageSize,
    },
  };
};
