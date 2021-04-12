import React from "react";
import Link from "next/link";

const MainPage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <Link href="/sets">
        <a>Sets</a>
      </Link>
      <Link href="/parts">
        <a>Parts</a>
      </Link>
      <Link href="/minifigs">
        <a>Minifigs</a>
      </Link>
    </div>
  );
};

export default MainPage;
