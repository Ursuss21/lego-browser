import React from "react";
import { Router, useRouter } from "next/router";

const Dropdown = () => {
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
    </div>
  );
};

export default Dropdown;
