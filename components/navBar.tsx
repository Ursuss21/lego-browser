import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/sets">
            <a>Sets</a>
          </Link>
        </li>
        <li>
          <Link href="/parts">
            <a>Parts</a>
          </Link>
        </li>
        <li>
          <Link href="/minifigs">
            <a>Minifigs</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
