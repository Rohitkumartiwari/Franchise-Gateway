import Header from "./header";
import Footer from "./footer";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <div className="flex flex-col h-screen justify-between">
       
      </div> */}
      <Header />
      <main>{children}</main>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default layout;
