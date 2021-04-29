import React, { FunctionComponent } from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header>
      <div className="navmenu">
        <Link href="/sets/1">Sets</Link>
        <Link href="/parts">Parts</Link>
        <Link href="/minifigs">Minifigs</Link>
      </div>
    </header>
  );
};

export default Header;
