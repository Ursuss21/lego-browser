import React from "react";
import { useRouter } from "next/router";
import prepareQueryString from "../middleware/query";

const ItemsOnPage = () => {
  const router = useRouter();
  const path = router.asPath.split("?")[0];

  const handleItemCountChange = (e: any) => {
    const queryString = prepareQueryString({
      path: router.asPath,
      page_size: e.target.value,
    });
    router.push(queryString);
  };

  return (
    <div className="dropdown">
      <select onChange={handleItemCountChange}>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div className="dropdown-description">elements on page</div>
    </div>
  );
};

export default ItemsOnPage;
