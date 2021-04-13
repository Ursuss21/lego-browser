import { GetStaticPaths } from "next";
import getDataFromAPI from "../../middleware/fetch";
import SetsMainPage, { getStaticProps } from "./index";

export default SetsMainPage;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getDataFromAPI({ folder: "minifigs" });
  const numberOfPages = Math.ceil(data.count / 100);

  const paths = Array(numberOfPages - 1)
    .fill("")
    .map((_, index) => {
      return { params: { currentPage: (index + 1).toString() } };
    });

  return {
    paths,
    fallback: false,
  };
};
