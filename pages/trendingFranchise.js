import React, { useEffect, useState } from "react";
import Styles from "../styles/franchiseHeader.module.css";
import Image from "next/image";
import Context, { useGloabalContext } from "../context/context";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Loader from "../Components/Loader";
const trendingFranchise = () => {
  const { getAllFranchiseList, allFranchiseList, loading } =
    useGloabalContext();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [id, setId] = useState("");

  useEffect(() => {
    getAllFranchiseList(id, filter, page);
  }, [filter, page]);

  return (
    <div>
      <div className={`${Styles.detailHeaderSection} flex items-center`}>
        <div className={Styles.wrapper}>
          <div
            className="container flex items-center
          "
          >
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
        <div className="border-2  rounded-md  border-gray shadow-md overflow-hidden mb-6 mt-10">
          <div className="border-b-2 border-gray bg-[#F6F6F6] px-7 py-3 overflow-hidden grid grid-cols-[1fr_1fr]">
            <div className="flex items-center">Franchise Company</div>
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
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full py-3 pl-[60px] text-sm rounded-md border-gray bg-white  !outline-none"
                placeholder="Search By Franchise Name"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="px-3 py-5">
            <Loader loading={loading}>
              <div className=" px-3 py-2 overflow-hidden grid grid-cols-2 lg:grid_md-5 md:grid-cols-5 lg:gap-4 md:gap-4 sm:gap-2 ">
                {(allFranchiseList?.data ? allFranchiseList?.data : []).map(
                  (item) => {
                    return (
                      <div
                        className={`${Styles.card_wrapper} bg-red flex flex-col border-gray items-center border-2  rounded-md bg-white py-9 cursor-pointer justify-center min-h-[185px]`}
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
            </Loader>
          </div>
        </div>
        <div
          className={`${Styles.pagination_container} mt-3 flex justify-center flex-row mb-5`}
        >
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            pageCount={allFranchiseList?.last_page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={1}
            onPageChange={(e) => {
              setPage(e.selected + 1);
              window.scrollTo("", 100);
            }}
            containerClassName="pagination"
            activeClassName="active bg-orange px-2 rounded-"
          />
        </div>
      </div>
    </div>
  );
};

export default trendingFranchise;
