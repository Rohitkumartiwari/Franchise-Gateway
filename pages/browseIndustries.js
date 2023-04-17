import React, { useEffect, useState } from "react";
import Styles from "../styles/franchiseHeader.module.css";
import Images from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import Context, { useGloabalContext } from "../context/context";
import Loader from "../Components/Loader";
const browseIndustries = () => {
  const router = useRouter();
  const { location, range, sectors } = router?.query;
  const [amountRange, setAmountRange] = useState("");
  const [sector, setSector] = useState("");
  const [place, setPlace] = useState("");
  const {
    getAllFranchiseList,
    getSectors,
    sectorsList,
    allFranchiseList,
    getAmountList,
    amountList,
    loading,
  } = useGloabalContext();

  useEffect(() => {
    if (sector || amountRange || place) {
      getAllFranchiseList(
        sector,
        "",
        "",
        amountCategory.find((item) => item.id == amountRange)?.value,
        place
      );
    }
  }, [sector, amountRange, place]);
  useEffect(() => {
    getSectors();
    getAmountList();
  }, []);
  const amountCategory = [
    {
      label: "1 Lakh - 5Lakh",
      value: [100000, 500000],
      id: 1,
    },
    {
      label: "5 Lakh - 10 Lakh",
      value: [500000, 1000000],
      id: 2,
    },
    {
      label: "10 Lakh - 25 Lakh",
      value: [1000000, 2500000],
      id: 3,
    },
    {
      label: "25 Lakh - 50 Lakh",
      value: [2500000, 5000000],
      id: 4,
    },
    {
      label: "50 Lakh - 1 cr",
      value: [5000000, 10000000],
      id: 5,
    },

    {
      label: "1 cr - 5 cr ",
      value: [10000000, 50000000],
      id: 6,
    },

    {
      label: "above 5cr",
      value: [50000001],
      id: 7,
    },
  ];
  useEffect(() => {
    if (sectors) {
      setSector(sectors);
    }
    if (range) {
      setAmountRange(range);
    }
    if (location) {
      setPlace(location);
    }
  }, [sectors, range, location]);

  return (
    <div>
      <div className={`${Styles.detailHeaderSection} flex items-center`}>
        <div className={Styles.wrapper}>
          <div className="container flex items-center">
            <div>
              <h4 className="text-4xl text-white">Browse Industries</h4>
              <h6 className="text-white">
                Home /<span className="text-orange"> Industries</span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="py-8 grid lg:grid-cols-[1.2fr_auto]  md:grid-cols-[1.8fr_auto] gap-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-border-gray"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-[60px] text-sm rounded-md border-gray bg-[#F6F6F6]  !outline-none"
              placeholder="Search By Franchise Name"
            />
          </div>

          <div className="grid md:grid-cols-[1fr_1fr] gap-6">
            <div className="rounded-md border-gray bg-[#F6F6F6] p-3 !outline-none">
              <select
                id="countries"
                className="w-full bg-[#F6F6F6] text-border-gray !outline-none cursor-pointer"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
              >
                <option value="">Sector</option>

                {(sectorsList ? sectorsList : []).map((item) => {
                  return (
                    <option value={item?.id} key={item?.id}>
                      {item?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="rounded-md border-gray bg-[#F6F6F6] p-3 !outline-none">
              <select
                id="countries"
                className="w-full bg-[#F6F6F6] text-border-gray !outline-none cursor-pointer"
                value={amountRange}
                onChange={(e) => setAmountRange(e.target.value)}
              >
                <option value="">Amount</option>
                {(amountCategory ? amountCategory : []).map((item) => {
                  return <option value={item?.id}>{item?.label}</option>;
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="border-2  rounded-md  border-gray shadow-md overflow-hidden mb-6">
          <div className="border-b-2 border-gray bg-[#F6F6F6] px-3 py-3 overflow-hidden flex justify-between">
            <h5 className="font-medium">Browse Industries</h5>
          </div>
          <div className="px-3 py-5 ">
            <Loader loading={loading}>
              {allFranchiseList?.data?.length > 0 ? (
                <div className=" px-3 py-2 overflow-hidden grid grid-cols-2 lg:grid_md-6 md:grid-cols-5 sm:grid-cols-4 lg:gap-4 md:gap-4 sm:gap-2 ">
                  {(allFranchiseList?.data ? allFranchiseList?.data : [])?.map(
                    (item) => {
                      return (
                        <div
                          className={`${Styles.card_wrapper} bg-red flex flex-col border-gray items-center border-2  rounded-md bg-white py-9 cursor-pointer justify-center min-h-[204px]`}
                          key={item?.id}
                        >
                          <Images
                            src={`/basepath/${item?.thumbnail}`}
                            height={100}
                            width={100}
                            alt="img not found"
                          />

                          {/* <p className="border-gray mt-2 text-black text-center">
                        {item?.brand_name}
                      </p> */}
                          {/* <Link href={`/franchiseDetail/${item?.slug}`}>
                        <p className="text-orange mb-0">Know More</p>
                      </Link> */}
                          <div
                            className={`${Styles.card_info} bg-light-black  border-none rounded-md px-3 py-4 flex flex-col justify-center`}
                          >
                            <h6 className="text-white mb-0 font-bold text-base">
                              {item?.brand_name}
                            </h6>

                            <div className="text-white mb-0 text-xs">
                              investment
                            </div>
                            <div className="text-white mb-2 text-sm">
                              {item?.investment}
                            </div>
                            <div className="text-white mb-0 text-xs">
                              Area Required
                            </div>
                            <div className="text-white mb-2 text-sm">
                              {item?.space}
                            </div>
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
                    }
                  )}
                </div>
              ) : (
                <h5 className="text-center">There is no data </h5>
              )}
            </Loader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default browseIndustries;
