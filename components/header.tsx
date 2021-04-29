import React from "react";
import Link from "next/link";
import Logo from "../components/logo";

const Header = () => {
  return (
    <header>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <div className="navmenu">
        <Link href="/sets/1">Sets</Link>
        <Link href="/parts">Parts</Link>
        <Link href="/minifigs">Minifigs</Link>
      </div>
    </header>
  );
};

export default Header;
