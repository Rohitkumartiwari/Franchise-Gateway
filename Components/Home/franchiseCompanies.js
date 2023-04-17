import React, { useEffect, useState } from "react";
import Context, { useGloabalContext } from "../../context/context";
import Link from "next/link";
import Image from "next/image";
import Styles from "../../styles/franchiseHeader.module.css";
import Loader from "../Loader";
const franchiseCompanies = () => {
  const { getFranchiseBrand, loading } = useGloabalContext();

  useEffect(() => {
    getFranchiseBrand();
  }, []);
  const [id, setId] = useState("");
  const { getAllFranchiseList, allFranchiseList } = useGloabalContext();
  const [filter, setFilter] = useState("");
  const [value, setValue] = useState(1);
  const [page, setPage] = useState(1);
  // useEffect(() => {
  //   getAllFranchiseList(value, filter, page);
  // }, [value, filter, page]);
  const { getFranchise, getSectors, francises } = useGloabalContext();

  useEffect(() => {
    getFranchise();
    getSectors();
  }, []);
  useEffect(() => {
    getAllFranchiseList(id, filter, page, [], "");
  }, [id, filter, page]);

  const lastbrand = allFranchiseList?.data?.slice(-11);

  return (
    <div className="border-2  rounded-md  border-gray shadow-md overflow-hidden">
      <div className="border-b-2 border-gray bg-[#F6F6F6] px-3 py-2 overflow-hidden flex justify-between">
        Franchise Companies
      </div>
      <div className="px-3 py-5">
        <div className="border-2  rounded-md border-none px-5 py-2 overflow-hidden grid   md:grid-cols-8 sm:grid-cols-2   lg:gap-8    ">
          {francises.map((fr, index) => (
            <div
              className={` flex flex-col items-center cursor-pointer ${
                value == index + 1 && "border-b-2 mb-2"
              }`}
              key={fr?.id}
            >
              <Image
                src={`/basepath/${fr.thumbnail}`}
                className="mix-blend-difference"
                height={45}
                width={45}
                alt="img not found"
                onClick={() => {
                  setId(fr?.id), setValue(index + 1);
                }}
              />
              <div className="text-black text-xs text-center">{fr?.name}</div>
            </div>
          ))}
        </div>

        <Loader loading={loading}>
          <div className=" px-3 py-2 overflow-hidden grid grid-cols-2 lg:grid_md-6 md:grid-cols-5 lg:gap-4 md:gap-4  sm:gap-x-2 xs:gap-2">
            {(lastbrand ? lastbrand : [])?.map((item) => {
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
          </div>
        </Loader>
      </div>
    </div>
  );
};

export default franchiseCompanies;
