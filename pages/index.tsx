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
            <div className="container-element sets">
              <div className="text-field">
                <div>Sets</div>
              </div>
            </div>
          </Link>
          <Link href="/parts">
            <div className="container-element parts">
              <div className="text-field">
                <div>Parts</div>
              </div>
            </div>
          </Link>
          <Link href="/minifigs">
            <div className="container-element minifigs">
              <div className="text-field">
                <div>Minifigs</div>
              </div>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
