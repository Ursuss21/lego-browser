import React, { FunctionComponent } from "react";
import Link from "next/link";

interface IProps {
  category: string;
  currentPage: number;
  pageSize: number;
  itemsCount: number;
  themeID?: number | undefined;
  partCategoryID?: number | undefined;
}

const Pagination: FunctionComponent<IProps> = ({
  category,
  currentPage,
  pageSize,
  itemsCount,
  themeID,
  partCategoryID,
}) => {
  const numberOfPages = Math.ceil(itemsCount / pageSize);
  const paginationSize = 5;

  const adjustPaginationSize = () => {
    if (numberOfPages === 0) {
      return -5;
    }
    if (numberOfPages === 1) {
      return -4;
    }
    if (numberOfPages === 2) {
      return -3;
    }
    if (
      currentPage === 1 ||
      currentPage === numberOfPages ||
      (currentPage === numberOfPages - 1 && numberOfPages <= 3)
    ) {
      return -2;
    } else if (
      currentPage === 2 ||
      (currentPage === numberOfPages - 1 && numberOfPages > 3)
    ) {
      return -1;
    }
    return 0;
  };

  const adjustPaginationOffset = () => {
    if (currentPage === 1) {
      return 0;
    } else if (currentPage === 2) {
      return -1;
    }
    return -2;
  };

  const setLinkClass = (active: boolean, disabled: boolean, text: string) => {
    if (active) {
      return <a className="active">{text}</a>;
    }
    if (disabled) {
      return <a className="disabled">{text}</a>;
    }
    return <a>{text}</a>;
  };

  const createPaginationLink = (
    targetPage: number,
    active: boolean,
    disabled: boolean,
    text: string
  ) => {
    let targetString;
    if (themeID !== undefined) {
      targetString = `/${category}/${targetPage}?page_size=${pageSize}&theme_id=${themeID}`;
    } else if (partCategoryID !== undefined) {
      targetString = `/${category}/${targetPage}?page_size=${pageSize}&part_cat_id=${partCategoryID}`;
    } else {
      targetString = `/${category}/${targetPage}?page_size=${pageSize}`;
    }
    return (
      <Link href={targetString} key={text}>
        {setLinkClass(active, disabled, text)}
      </Link>
    );
  };

  const pagination = Array(paginationSize + adjustPaginationSize())
    .fill("")
    .map((_, index) => {
      const idx = currentPage + index + adjustPaginationOffset();
      return idx;
    });
  return (
    <div className="pagination">
      {currentPage === 1
        ? createPaginationLink(1, false, true, "<<")
        : createPaginationLink(1, false, false, "<<")}
      {currentPage === 1
        ? createPaginationLink(currentPage - 1, false, true, "<")
        : createPaginationLink(currentPage - 1, false, false, "<")}
      {pagination.map((page) => {
        if (currentPage === page) {
          return createPaginationLink(page, true, false, page.toString());
        } else {
          return createPaginationLink(page, false, false, page.toString());
        }
      })}
      {currentPage === numberOfPages
        ? createPaginationLink(currentPage + 1, false, true, ">")
        : createPaginationLink(currentPage + 1, false, false, ">")}
      {currentPage === numberOfPages
        ? createPaginationLink(numberOfPages, false, true, ">>")
        : createPaginationLink(numberOfPages, false, false, ">>")}
    </div>
  );
};

export default Pagination;
