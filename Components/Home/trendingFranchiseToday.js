import React, { useState, Fragment, useEffect } from "react";
import img1 from "../../public/Images/food1.png";
import Styles from "../../styles/franchiseHeader.module.css";
import Image from "next/image";
import Context, { useGloabalContext } from "../../context/context";
import Link from "next/link";

import Loader from "../Loader";
const trendingFranchiseCourses = () => {
  const { franchiseBrand, getFranchiseBrand, getBrandData, loading } =
    useGloabalContext();

  useEffect(() => {
    getFranchiseBrand();
  }, []);

  const brand = getBrandData.slice(0, 14);

  return (
    <div className="border-2  rounded-md  border-gray shadow-md overflow-hidden">
      <div className="border-b-2 border-gray bg-[#F6F6F6] px-3 py-2 overflow-hidden flex justify-between">
        Trending Franchise
        <Link href="/trendingFranchise">
          <h6 className="text-orange">View All</h6>
        </Link>
      </div>
      <div className="px-3 py-5">
        <Loader loading={loading}>
          <div className=" px-3 py-2 overflow-hidden grid grid-cols-2 lg:grid_md-6 md:grid-cols-5 lg:gap-4 md:gap-4 sm:gap-2 ">
            {(brand ? brand : [])?.map((item) => {
              return (
                <div
                  className={`${Styles.card_wrapper} bg-red flex flex-col border-gray items-center border-2  rounded-md bg-white py-9 cursor-pointer justify-center min-h-[204px]`}
                  key={item?.id}
                >
                  <div>
                    <Image
                      src={`/basepath/${item?.thumbnail}`}
                      height={110}
                      width={110}
                      alt="img not found"
                    />
                  </div>
                  <div
                    className={`${Styles.card_info} bg-light-black  border-none rounded-md px-3 py-4 flex flex-col justify-center`}
                  >
                    <h6 className="text-white mb-0 font-bold text-base">
                      {item?.brand_name}
                    </h6>

                    <div className="text-white mb-0 text-xs">investment</div>
                    <div className="text-white mb-2 text-sm">
                      {item?.investment}
                    </div>
                    <div className="text-white mb-0 text-xs">Area Required</div>
                    <div className="text-white mb-2 text-sm">{item?.space}</div>
                    <span className="text-orange cursor-pointer">
                      <Link href={`/franchiseDetail/${item?.slug}`}>
                        View More
                      </Link>
                    </span>
                    {/* <div className="text-white mb-0">Outlet</div>
                  <div className="text-white text-xs">
                    {item?.franchise_outlet}
                  </div> */}
                  </div>
                </div>
              );
            })}

            <div className="bg-red text-orange flex justify-center items-center border-2  rounded-md bg-white py-9 cu">
              50 + More
            </div>
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default trendingFranchiseCourses;
