import React from "react";

import img2 from "../../public/Images/Rectangle 13.png";

import Image from "next/image";
const topBuisnessOpportunities = () => {
  return (
    <div className="border-2 rounded-md  border-gray shadow-md overflow-hidden">
      <div className="border-b-2 border-gray bg-[#F6F6F6] px-3 py-2 overflow-hidden flex justify-between">
        Top Buisness Opportunities
        <h6 className="text-orange">View All</h6>
      </div>

      <div className="px-3 py-5">
        <div className=" px-3 py-2 overflow-hidden grid grid-cols-2 lg:grid_md-6 md:grid-cols-6 lg:gap-4 md:gap-4 sm:gap-2 ">
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>
          <div className="bg-red flex flex-col border-gray  border-2 rounded-md bg-white py-3 px-3 cursor-pointer">
            <div>
              <Image src={img2} height={95} width={181} alt="img not found"/>
            </div>
            <p className="text-black">Jam & Jelly</p>
          </div>

          <div className="bg-red text-orange flex justify-center items-center border-2 rounded-md bg-white py-4">
            50 + More
          </div>
        </div>
      </div>
    </div>
  );
};

export default topBuisnessOpportunities;
