import React from "react";
import { useRouter } from "next/router";

const ItemsOnPage = () => {
  const router = useRouter();
  const path = router.asPath.split("?")[0];

  const handleItemCountChange = (e: any) => {
    router.push(`${path}?page_size=${e.target.value}`);
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
