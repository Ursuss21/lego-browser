import React, { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Header from "../../components/header";
import ItemsOnPage from "../../components/itemsOnPage";
import Pagination from "../../components/pagination";
import Card from "../../components/card";
import Footer from "../../components/footer";
import PartCategory from "../../components/partCategory";

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
  partCategories: [
    {
      id: number;
      name: string;
    }
  ];
  partCategoriesCount: number;
  currentPage: number;
  pageSize: number;
  partCategoryID: number;
}

const PartsMainPage: FunctionComponent<IProps> = ({
  parts,
  partsCount,
  partCategories,
  partCategoriesCount,
  currentPage,
  pageSize,
  partCategoryID,
}) => {
  return (
    <div>
      <Header />
      <main>
        <div className="filter-options">
          <ItemsOnPage />
          <PartCategory
            partCategories={partCategories}
            partCategoriesCount={partCategoriesCount}
          />
        </div>
        <Pagination
          category="parts"
          currentPage={currentPage}
          itemsCount={partsCount}
          pageSize={pageSize}
          partCategoryID={partCategoryID}
        />
        <div className="card-container">
          {parts.map((part) => {
            return (
              <Card
                path="/parts/part/"
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

  const prtCatID = context.query.part_cat_id as string;
  const partCategoryID = parseInt(prtCatID, 10) || 0;

  console.log(context.query);
  const partsData = await getDataFromAPI({
    folder: "parts",
    page: currentPage,
    page_size: pageSize,
    part_cat_id: partCategoryID,
  });

  const partCategoriesData = await getDataFromAPI({
    folder: "part_categories",
    page_size: 1000,
  });

  return {
    props: {
      parts: partsData.results,
      partsCount: partsData.count,
      partCategories: partCategoriesData.results,
      partCategoriesCount: partCategoriesData.count,
      currentPage,
      pageSize,
      partCategoryID,
    },
  };
};
