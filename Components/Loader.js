import React from "react";
import loaderImg from "../public/images/loader.gif";
import Image from "next/image";
const Loader = ({ loading, children }) => {
  if (!loading) {
    return <div>{children}</div>;
  }

  return (
    <div className="spinner-container d-flex justify-content-center">
      <div className="position-relative">
        <Image
          src={loaderImg}
          width={150}
          height={80}
          objectFit="contain"
          alt="loading...."
          className="w-max mx-auto h-[200px]"
        />
      </div>
    </div>
  );
};

export default Loader;
