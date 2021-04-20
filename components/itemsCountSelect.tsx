import React, { FunctionComponent, useState } from "react";

const ItemCountSelect = () => {
  return (
    <select>
      <option value="20">20</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
      <option value="500">500</option>
    </select>
  );
};

export default ItemCountSelect;
