import React from "react";
import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

const MainPage = () => {
  return (
    <div>
      <Header />
      <main>
        <section className="landing-container">
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
      <Footer />
    </div>
  );
};

export default MainPage;
