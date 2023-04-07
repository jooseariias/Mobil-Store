import React from "react";
import img from "../../assets/not.jpg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function NotFound() {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={img} alt="logo404" style={{ height: '80vh' }} />
      </div>
      <Footer />
    </div>
  );
}
