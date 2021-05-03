import React, { FunctionComponent } from "react";
import Link from "next/link";

interface IProps {
  category: string;
  currentPage: number;
  pageSize: number;
  themeID: number;
  setsCount: number;
}

const adjustPaginationSize = (currentPage: number, numberOfPages: number) => {
  if (numberOfPages === 1) {
    return -4;
  }
  if (numberOfPages === 2) {
    return -3;
  }
  if (currentPage === 1 || currentPage === numberOfPages) {
    return -2;
  } else if (currentPage === 2 || currentPage === numberOfPages - 1) {
    return -1;
  }
  return 0;
};

const adjustPaginationOffset = (currentPage: number) => {
  if (currentPage === 1) {
    return 0;
  } else if (currentPage === 2) {
    return -1;
  }
  return -2;
};

const Pagination: FunctionComponent<IProps> = ({
  category,
  currentPage,
  pageSize,
  themeID,
  setsCount,
}) => {
  const numberOfPages = Math.ceil(setsCount / pageSize);
  const paginationSize = 5;

  const pagination = Array(
    paginationSize + adjustPaginationSize(currentPage, numberOfPages)
  )
    .fill("")
    .map((_, index) => {
      const idx = currentPage + index + adjustPaginationOffset(currentPage);
      return idx;
    });
  return (
    <div className="pagination">
      {pagination.map((page) => {
        if (currentPage === page) {
          return (
            <Link
              href={`/${category}/${page}?page_size=${pageSize}&theme_id=${themeID}`}
              key={page}
            >
              <a className="active">{page}</a>
            </Link>
          );
        } else {
          return (
            <Link
              href={`/${category}/${page}?page_size=${pageSize}&theme_id=${themeID}`}
              key={page}
            >
              <a>{page}</a>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default Pagination;
