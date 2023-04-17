import React, { useEffect, useState, Fragment } from "react";
import Images from "next/image";
import ReactPlayer from "react-player";
import axios from "axios";
import Styles from "../../styles/franchiseHeader.module.css";
import img from "../../public/Images/detail/Rectangle 3524.png";
import img1 from "../../public/Images/detail/Frame 58.svg";
import img2 from "../../public/Images/detail/Vector (3).png";
import img3 from "../../public/Images/food1.png";
import img4 from "../../public/Images/detail/image 4.png";
import Context, { useGloabalContext } from "../../context/context";
import { useRouter } from "next/router";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { ImCancelCircle } from "react-icons/im";
import Loader from "../../Components/Loader";
const franchiseDetail = () => {
  const router = useRouter();
  const route = router.query.slug;
  const [isOpen, setIsOpen] = useState(false);
  const [isReadMore, setIsReadMore] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [investment, setInvestment] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    pincode: "",
  });
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  const {
    getFranchiseDetail,
    franchiseDetailBrand,
    franchiseDetailContentDocuments,
    franchiseDetailContents,
    loading,
  } = useGloabalContext();
  useEffect(() => {
    getFranchiseDetail(route);
  }, [route]);
  const handlePinCodeChange = (e) => {
    const { value } = e.target;
    if (value.length < 7 || _.isEmpty(value)) {
      setPincode(value);
    }

    if (value.length === 6) {
      axios.get(`https://api.postalpincode.in/pincode/${value}`).then((res) => {
        if (res.data[0].Status === "Success") {
          setCity(res.data[0].PostOffice[0].Block);
          setState(res.data[0].PostOffice[0].State);
        }
      });
    } else {
      setCity("");
      setState("");
    }
  };
  const subMit = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("mobile", mobile);
    data.append("pincode", pincode);
    data.append("city", city);
    data.append("state", state);
    data.append("investment", investment);

    data.append("remarks", remarks);
    data.append("any", 2);
    axios
      .post(`/api/franchise-enquiries`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Enquiery Form Submit Successfully.");
          setCity("");
          setEmail("");
          setMobile("");
          setName("");
          setPincode("");
          setState("");
          setInvestment("");
          setRemarks("");
        }
      })

      .catch((error) => setErrors(error.response?.data?.errors));
  };

  return (
    <div>
      <div className={`${Styles.detailHeaderSection} flex items-center`}>
        <div className={Styles.wrapper}>
          <div className="container flex items-center">
            <div>
              <h4 className="text-4xl text-white">
                {franchiseDetailBrand?.brand_name}
              </h4>
              <h6 className="text-orange">
                Home /
                <span className="text-orange">
                  Franchise Detail/ {franchiseDetailBrand?.brand_name}
                </span>
              </h6>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-10">
        <div className="grid grid-cols-[2.3fr_.8fr] mb-8 ">
          <div>
            <Loader loading={loading}>
              <h4 className="mb-5">{franchiseDetailBrand?.brand_name}</h4>

              {franchiseDetailBrand?.text &&
                (isReadMore ? (
                  <>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: franchiseDetailBrand?.text.slice(0, 430),
                      }}
                    />
                    <span
                      className="text-primary ms-2 cursor-pointer "
                      onClick={toggleReadMore}
                    >
                      {isReadMore ? "Show more" : " Show less"}
                    </span>
                  </>
                ) : (
                  <>
                    <p
                      className={`${Styles.block_subtitle} `}
                      dangerouslySetInnerHTML={{
                        __html: franchiseDetailBrand?.text,
                      }}
                    />
                    <span
                      className="text-primary ms-2 cursor-pointer "
                      onClick={toggleReadMore}
                    >
                      {isReadMore ? "Show more" : " Show less"}
                    </span>
                  </>
                ))}

              <div className=" w-full max-w-4lg rounded-2xl bg-white pr-2 mt-5">
                {(franchiseDetailContents ? franchiseDetailContents : []).map(
                  (item) => {
                    return (
                      <>
                        <Disclosure>
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-7 text-left text-sm font-medium text-black hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75 mb-4 ">
                                <span className="text-base">{item?.title}</span>
                                <ChevronUpIcon
                                  className={`${
                                    open ? "rotate-180 transform" : ""
                                  } h-5 w-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="px-4 py-2 text-sm text-black">
                                <p
                                  className={` text-black`}
                                  dangerouslySetInnerHTML={{
                                    __html: item?.text,
                                  }}
                                />
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      </>
                    );
                  }
                )}
              </div>
            </Loader>
            {franchiseDetailContentDocuments.some(
              (item) => item.type == "gallery"
            ) && (
              <div className="border-2  rounded-md  border-gray shadow-md mb-10 overflow-hidden mr-2">
                <div className="border-b-2 border-gray bg-[#F6F6F6] px-3 py-2 overflow-hidden flex justify-between">
                  Gallery
                </div>
                <div className="px-3 py-5">
                  <div className=" px-3 py-2 overflow-hidden grid grid-cols-2 lg:grid_md-4 md:grid-cols-4 lg:gap-4 md:gap-4 sm:gap-2 ">
                    {franchiseDetailContentDocuments.map((item) => {
                      return (
                        <div className="bg-red flex flex-col border-none items-center border-2  rounded-md bg-white  cursor-pointer">
                          <Images
                            src={`/basepath/${item?.thumbnail}`}
                            alt="img not found"
                            width="0"
                            height="0"
                            sizes="100vw"
                            className="w-full h-[150px]"
                            // className="max-h-[150px] max-w-[200px]"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="border border-md  p-5 shadow-md flex flex-col border-white h-full">
            <div>
              <img
                src={`/basepath/${franchiseDetailBrand?.thumbnail}`}
                width={100}
                height={370}
                className="bg-gray mb-4 mx-auto"
                alt="img not found"
              />
            </div>

            <div className=" border-b-[1px] border-gray py-3 grid grid-cols-[1fr_2fr] items-center">
              <Images src={img1} width={30} height={30} />

              <div className="flex flex-col">
                <p className="mb-1 text-light-gray">Investment</p>
                <h5>{franchiseDetailBrand?.investment}</h5>
              </div>
            </div>
            <div className=" border-b-[1px] border-gray py-3 grid grid-cols-[1fr_2fr] items-center">
              <Images src={img1} width={30} height={30} />
              <div className="flex flex-col">
                <p className="mb-1 text-light-gray">Area Required</p>
                <h5>{franchiseDetailBrand?.space}</h5>
              </div>
            </div>
            <div className=" border-b-[1px] border-gray py-3 grid grid-cols-[1fr_2fr] items-center">
              <Images src={img1} width={30} height={30} />
              <div className="flex flex-col">
                <p className="mb-1 text-light-gray">Outlet</p>
                <h5>{franchiseDetailBrand?.franchise_outlet}</h5>
              </div>
            </div>
            <button className="bg-orange text-white px-5 py-3 text-center mt-4 flex justify-center rounded ">
              <Images src={img2} width={26} height={26} />
              <span className="px-4" onClick={() => setIsOpen(true)}>
                Watch Video
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
                      <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-1xl bg-white text-left align-middle shadow-xl transition-all">
                        {/* <div className={`${Styles.video_frame}`}>
                          
                        </div> */}
                        <ReactPlayer
                          className="react-player"
                          url={`${franchiseDetailBrand?.url}`}
                          width="100%"
                          height="500px"
                          controls={true}
                          playing={isOpen}
                        />
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
            <h5 className="border-b-[1px] border-gray py-2">Enquiry Form</h5>
            <div className="mt-5">
              <div className="mb-3">
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray dark:placeholder-gray dark:text-white focus:ring-0 "
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <span className="text-danger">{errors?.name[0]}</span>
              </div>
              <div class="grid gap-6 mb-3 md:grid-cols-2">
                <div>
                  <input
                    type="email"
                    id="email"
                    class="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                  <span className="text-danger">{errors?.email[0]}</span>
                </div>
                <div>
                  <input
                    type="text"
                    id="number"
                    class="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="Number"
                    required
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                  />
                  <span className="text-danger">{errors?.mobile[0]}</span>
                </div>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  id="pincode"
                  className="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray dark:placeholder-gray dark:text-white focus:ring-0 "
                  placeholder="Pincode"
                  required
                  value={pincode}
                  onChange={(e) => handlePinCodeChange(e)}
                />
                {/* <span className="text-danger">{errors?.pincode[0]}</span> */}
              </div>
              <div class="grid gap-6 mb-3 md:grid-cols-2">
                <div>
                  <input
                    type="text"
                    id="city"
                    class="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="City"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="state"
                    class="bg-gray-50 border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    placeholder="State"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <select
                  id="countries"
                  className="bg-gray-50 border-2 border-gray text-gray text-sm rounded-md focus:ring-0 block w-full p-2.5 dark:bg-gray-700 !outline-none dark:placeholder-gray-400 dark:text-white cursor-pointer"
                  onChange={(e) => setInvestment(e.target.value)}
                  value={investment}
                >
                  <option defaultValue>Investment</option>
                  <option value="10 Lakh">10 Lakh</option>
                  <option value="25 Lakh">25 Lakh</option>
                  <option value="50 Lakh">50 Lakh</option>
                  <option value="1 Crore">1 Crore</option>
                  <option value="Above 1 Crore">Above 1 Crore</option>
                </select>
              </div>
              <textarea
                id="message"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:ring-0 !outline-none"
                placeholder="Remarks..."
                onChange={(e) => setRemarks(e.target.value)}
                value={remarks}
              ></textarea>
            </div>
            <button
              className="bg-orange text-white px-5 py-3 text-center mt-2"
              onClick={subMit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default franchiseDetail;
