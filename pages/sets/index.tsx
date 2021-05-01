import React, { FunctionComponent } from "react";
import { GetServerSideProps } from "next";
import getDataFromAPI from "../../middleware/fetch";
import Pagination from "../../components/pagination";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Card from "../../components/card";

interface IProps {
  count: number;
  currentPage: number;
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
  sets,
}) => {
  return (
    <div>
      <Header />
      <main>
        <Pagination category="sets" currentPage={currentPage} count={count} />
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
        <Pagination category="sets" currentPage={currentPage} count={count} />
      </main>
      <Footer />
    </div>
  );
};

export default SetsMainPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const curPage = context.params?.currentPage as string;
  const currentPage = parseInt(curPage, 10);

  const data = await getDataFromAPI({
    folder: "sets",
    page: currentPage || 1,
    page_size: 20,
  });
  return {
    props: {
      sets: data.results,
      count: data.count,
      currentPage,
    },
  };
};
