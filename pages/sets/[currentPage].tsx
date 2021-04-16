import { GetStaticPaths } from "next";
import getDataFromAPI from "../../middleware/fetch";
import SetsMainPage, { getStaticProps } from "./index";

export default SetsMainPage;
export { getStaticProps };

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await getDataFromAPI({ folder: "sets" });
  const numberOfPages = Math.ceil(data.count / 100);

  const paths = Array(numberOfPages)
    .fill("")
    .map((_, index) => {
      return { params: { currentPage: (index + 1).toString() } };
    });

  return {
    paths,
    fallback: false,
  };
};
