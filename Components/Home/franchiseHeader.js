import React, { useState, Fragment, useEffect } from "react";
import Styles from "../../styles/franchiseHeader.module.css";
import { BiMessageDetail } from "react-icons/bi";
import Image from "next/image";
import FranchiseCourse from "./franchiseCourse";
import TrendingFranchiseCourse from "./trendingFranchiseToday";
import FranchiseCompanies from "../Home/franchiseCompanies";
import TopBuisness from "../Home/topBuisnessOpportunities";
import { Dialog, Transition } from "@headlessui/react";
import { ImCancelCircle } from "react-icons/im";
import img1 from "../../public/Images/enquiry.png";
import { useGloabalContext } from "../../context/context";
import { useAuthGloabalContext } from "../../context/authContext";
import { useContext } from "react";
import Link from "next/link";
import RangeSlider from "react-range-slider-input";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
const franchiseHeader = () => {
  const [value, setValue] = useState(1);
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [range, setRange] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [sector, setSector] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [movieFilterd, setMovieFilterd] = useState(null);
  const [searchList, setSearchList] = useState(false);
  const { isAuthenticated } = useAuthGloabalContext();
  const router = useRouter();
  const initialvalues = {
    name: "",
    productname: "",
    mobile: "",
    email: "",
    message: "",
  };
  const [errors, setErrors] = useState({});
  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState(initialvalues);
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "mobile") {
      if (!isNaN(value) && value.length < 11) {
        setData({ ...data, [name]: value });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };
  const {
    getAllFranchiseList,
    francises,
    getSectors,
    sectorsList,
    allFranchiseList,
    getFranchiseEnquiry,
    franchsieEnquiry,
    getCompleteFranchiseList,
    completeFranchsieList,
    getAmountList,
    amountList,
  } = useGloabalContext();
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    getAllFranchiseList(id, filter, page, [], "");
  }, [id, filter, page]);

  useEffect(() => {
    getSectors();
    getCompleteFranchiseList();
    getAmountList();
  }, []);
  const submit = () => {
    axios
      .post(`/api/franchise-enquiries`, {
        ...data,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Enquiry Form Submit Successfully.");
          setIsOpen(false);
        }
      })
      .catch((error) => setErrors(error.response?.data?.errors));
  };

  const filterMovie = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      setSearchList(true);
      const result = completeFranchsieList.filter((movie) => {
        return movie.brand_name.toLowerCase().includes(keyword.toLowerCase());
      });
      setMovieFilterd(result);
    } else {
      setMovieFilterd(null);
      setSearchList(false);
    }
    setName(keyword);
  };
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
  return (
    <>
      <ToastContainer />

      <div className={`${Styles.header_backgroundImage} flex relative`}>
        <div className={Styles.wrapper}>
          <div className="container max-w-[800px]  flex flex-col justify-center mb-8 ">
            <h4 className="text-xl text-white font-bold mb-3">
              Explore for products & find verified sellers near you
            </h4>
            <div className="border-2 rounded-md bg-white px-3 py-2  grid grid-cols-[1.5fr_4fr_1fr] border-none relative">
              <div
                className="border-r-2 border-inherit text-gray flex justify-between items-center cursor-pointer"
                onClick={() => setToggle(!toggle)}
              >
                <p className="mb-0">Advance Search</p>
              </div>
              <div className="flex items-center px-3 relative">
                <input
                  type="text"
                  className="focus:outline-none"
                  onChange={(e) => filterMovie(e)}
                  placeholder="Search 100+ Franchise"
                />
                {movieFilterd && (
                  <div className="absolute  bg-white top-[40px] w-full left-0 px-4 z-[1]">
                    {(movieFilterd ? movieFilterd.slice(0, 5) : []).map(
                      (item) => {
                        return (
                          <Link
                            href={`/franchiseDetail/${item?.slug}`}
                            key={data?.id}
                            passHref
                          >
                            <p className="text-black w-full cursor-pointer">
                              {item?.brand_name}
                            </p>
                          </Link>
                        );
                      }
                    )}
                  </div>
                )}
              </div>
              <div className="hidden md:block">
                <button className="border-2 rounded-md bg-orange px-[50px] py-3 text-white border-none">
                  Search
                </button>
              </div>
            </div>
          </div>
          <div className="rotate-90 absolute right-[-50px] top-[40%]">
            <button
              className="border-2 rounded-md bg-orange py-[10px] px-2  text-white border-none flex items-center content-center "
              onClick={() => setIsOpen(true)}
            >
              Enquiry Now
              <span className="mx-2 ">
                <BiMessageDetail />
              </span>
            </button>

            <Transition appear show={isOpen} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsOpen(false)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-1xl bg-white text-left align-middle shadow-xl transition-all ">
                        <Dialog.Title
                          as="h3"
                          className="text-sm font-medium leading-6 text-gray-900 bg-orange text-center text-white py-3"
                        >
                          Get Our Best Franchise Here
                        </Dialog.Title>
                        <div className="py-5 px-5">
                          <div className="mt-2 px-5 relative mx-auto flex justify-center">
                            <Image
                              src={img1}
                              height={330}
                              width={"100%"}
                              alt="img not found"
                            />
                          </div>
                          <div class="grid gap-6 mb-3 md:grid-cols-2">
                            <div>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                onChange={handleChange}
                                className="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder="Full Name"
                                required
                              />
                              <p className="d-block text-danger">
                                {errors?.name?.[0]}
                              </p>
                            </div>
                            <div>
                              <input
                                type="text"
                                id="productname"
                                name="productname"
                                onChange={handleChange}
                                className="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder="Product Name"
                                required
                              />
                            </div>
                          </div>
                          <div class="grid gap-6 mb-3 md:grid-cols-2">
                            <div>
                              <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                onChange={handleChange}
                                className="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder="Mobile"
                                required
                              />
                              <p className="d-block text-danger">
                                {errors?.mobile?.[0]}
                              </p>
                            </div>
                            <div>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                onChange={handleChange}
                                className="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                                placeholder="Email"
                                required
                              />
                              <p className="d-block text-danger">
                                {errors?.email?.[0]}
                              </p>
                            </div>
                          </div>
                          <div className="mb-3">
                            <input
                              type="text"
                              id="message"
                              name="message"
                              onChange={handleChange}
                              className="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray dark:placeholder-gray dark:text-white focus:ring-0 "
                              placeholder="Message"
                            />
                          </div>
                          <div className="mt-4 text-center">
                            <button
                              type="button"
                              className="inline-flex justify-center rounded-1xl border border-transparent  px-4 py-2 text-sm font-medium text-white bg-orange "
                              onClick={submit}
                            >
                              Send Now
                            </button>
                          </div>
                        </div>
                        <button className="absolute top-3 right-2">
                          <ImCancelCircle
                            fontSize={20}
                            color="white"
                            onClick={() => setIsOpen(false)}
                          />
                        </button>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        </div>
      </div>

      <div className="relative">
        {toggle ? (
          <>
            <div className="bottom-[-50px] left-[20%] max-w-[900px]  flex flex-col justify-center absolute border-gray">
              <div
                className={`${Styles.triangle} absolute left-[156px] top-[-14px]`}
              ></div>
              <div className="border-2 px-4 rounded-md bg-white  py-4 overflow-hidden    top-[31px] w-full left-0 z-[1] border-white relative ">
                <div className="grid grid-cols-[1fr_1fr_1fr] gap-x-2">
                  <div className="flex flex-col">
                    <div className="grid grid-cols-[1fr] gap-x-3 mb-4">
                      <div>
                        <h6 className="mb-2 text-center"> Top Categories</h6>

                        <select
                          id="countries"
                          className="bg-gray-50 border-2 border-gray text-gray-100 text-sm rounded-md focus:ring-0 block w-full p-2.5 dark:bg-gray-700 !outline-none dark:placeholder-gray-400 dark:text-white cursor-pointer"
                          onChange={(e) => setSector(e.target.value)}
                        >
                          <option value="">Sectors</option>
                          {(sectorsList ? sectorsList : []).map((item) => {
                            return (
                              <option value={item?.id}>{item?.name}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-2 text-center"> Loacation</h6>

                    <select
                      id="countries"
                      className="bg-gray-50 border-2 border-gray text-gray-100 text-sm rounded-md focus:ring-0 block w-full p-2.5 dark:bg-gray-700 !outline-none dark:placeholder-gray-400 dark:text-white cursor-pointer"
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="Metros">Metros</option>
                      <option value="Tier-1">Tier-1</option>
                      <option value="Tier-2">Tier-2</option>
                      <option value="Sub-Urban">Sub-Urban</option>
                      <option value="Rural">Rural</option>
                    </select>
                  </div>
                  <div className=" pt-0">
                    <h6 className="mb-2">Investment Range</h6>
                    <select
                      id="countries"
                      className="bg-gray-50 border-2 border-gray text-gray-100 text-sm rounded-md focus:ring-0 block w-full p-2.5 dark:bg-gray-700 !outline-none dark:placeholder-gray-400 dark:text-white cursor-pointer"
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setRange(
                          amountCategory.find(
                            (item) => item.id == e.target.value
                          )?.value || []
                        );
                      }}
                    >
                      <option value="">Amount</option>
                      {amountCategory.map((item) => {
                        return (
                          <>
                            <option value={item.id} key={item.id}>
                              {item.label}
                            </option>
                          </>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="grid grid-row-[1fr] ">
                  <Link
                    href={{
                      pathname: "/browseIndustries",
                      query: {
                        location: location,
                        sectors: sector,
                        range: amount,
                      },
                    }}
                    className="bg-orange text-white px-5 py-3 text-center mt-2"
                  >
                    Submit
                  </Link>
                </div>
              </div>
              {/* <div className="border-2 px-4 rounded-md bg-white  py-4 overflow-hidden grid grid-row-[1fr]    w-full  z-[1] border-white  gap-x-2 relative">
                <Link
                  href={{
                    pathname: "/browseIndustries",
                    query: {
                      location: location,
                      sectors: sector,
                      range: range,
                    },
                  }}
                  className="bg-orange text-white px-5 py-3 text-center mt-2"
                >
                  Submit
                </Link>
              </div> */}
            </div>
          </>
        ) : null}
      </div>
      <div className="bg-white py-20 relative ">
        {/* <div className="container absolute top-[-30px] translate-x-[-50%] left-[50%]">
          <div className="border-2  rounded-md border-white bg-white px-5 py-2 overflow-hidden grid   md:grid-cols-8 grid-cols-1 lg:gap-8 shadow-md   ">
            {francises.map((fr, index) => (
              <div
                className={`bg-red flex flex-col items-center cursor-pointer ${
                  value == index + 1 && "border-[1px] border-[white] shadow-lg"
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
                <div className="text-black text-xs">{fr?.name}</div>
              </div>
            ))}
          </div>
        </div> */}
        <div className="container mb-7">
          <FranchiseCompanies />
        </div>
        <div className="container mb-7">
          <TrendingFranchiseCourse />
        </div>
        <div className="container mb-7">
          <FranchiseCourse />
        </div>

        {/* <div className="container mb-7">
          <TopBuisness />
        </div> */}
      </div>
    </>
  );
};

export default franchiseHeader;
