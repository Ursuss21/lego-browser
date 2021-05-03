import React, { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Pagination from "../../components/pagination";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Card from "../../components/card";
import ItemsOnPage from "../../components/itemsOnPage";
import Theme from "../../components/theme";

interface IProps {
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
  setsCount: number;
  themes: [
    {
      id: number;
      parent_id: number;
      name: string;
    }
  ];
  themesCount: number;
  currentPage: number;
  pageSize: number;
}

const SetsMainPage: FunctionComponent<IProps> = ({
  sets,
  setsCount,
  themes,
  themesCount,
  currentPage,
  pageSize,
}) => {
  return (
    <div>
      <Header />
      <main>
        <div className="filter-options">
          <ItemsOnPage />
          <Theme themes={themes} themesCount={themesCount} />
        </div>
        <Pagination
          category="sets"
          currentPage={currentPage}
          setsCount={setsCount}
          pageSize={pageSize}
        />
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
          setsCount={setsCount}
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

  const thmID = context.query.theme_id as string;
  const themeID = parseInt(thmID, 10) || 0;

  console.log(context.query);
  const setsData = await getDataFromAPI({
    folder: "sets",
    page: currentPage,
    page_size: pageSize,
    theme_id: themeID,
  });

  const themesData = await getDataFromAPI({
    folder: "themes",
    page_size: 1000,
  });

  return {
    props: {
      sets: setsData.results,
      setsCount: setsData.count,
      themes: themesData.results,
      themesCount: themesData.count,
      currentPage,
      pageSize,
    },
  };
};
