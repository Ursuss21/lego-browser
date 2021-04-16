import React from "react";
import Link from "next/link";

const MainPage = () => {
  return (
    <div>
      <header>Head</header>
      <main>
        <section className="container">
          <Link href="/sets/1">
            <div className="container-element red">
              <p className="text-field">Sets</p>
            </div>
          </Link>
          <Link href="/parts">
            <div className="container-element green">
              <p className="text-field">Parts</p>
            </div>
          </Link>
          <Link href="/minifigs">
            <div className="container-element blue">
              <p className="text-field">Minifigs</p>
            </div>
          </Link>
        </section>
      </main>
      <footer>© 2021 Copyright by Robert Skrzypczak</footer>
    </div>
  );
};

export default MainPage;
