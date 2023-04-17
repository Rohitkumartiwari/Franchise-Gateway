import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Context, { useGloabalContext } from "../../context/context";
import Loader from "../Loader";
const franchiseCourse = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  useEffect(() => {
    getFranchiseCourses();
  }, []);
  const { getfrnachiseCourses, getFranchiseCourses, loading } =
    useGloabalContext();

  return (
    <div className="border-2  rounded-md  border-gray shadow-md overflow-hidden">
      <div className="border-b-2 border-gray bg-[#F6F6F6] px-3 py-2 overflow-hidden flex justify-between">
        Franchise Courses
      </div>
      <Loader loading={loading}>
        <div className="px-1 py-5">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // means to render carousel on server-side.
            infinite={true}
            autoPlaySpeed={2000}
            keyBoardControl={true}
            customTransition="all 1s"
            arrows={false}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            transitionDuration={1000}
            renderButtonGroupOutside
            containerClass="carousel-container pb-5 "
            dotListClass={` custom-dot-list-style  `}
            itemClass=" px-1 "
          >
            {(getfrnachiseCourses ? getfrnachiseCourses.slice(0, 10) : [])?.map(
              (item) => {
                return item?.course_detail?.slice(0, 5).map((data) => {
                  return (
                    <div
                      className=" px-1 py-2 overflow-hidden grid grid-cols-1 lg:grid-md-2 md:grid-cols-1 lg:gap-4  md:gap-4 sm:gap-2"
                      key={data?.id}
                    >
                      <a></a>
                      <div className="bg-red flex flex-col border-gray  border-2  rounded-md bg-white py-3 px-3 cursor-pointer ">
                        <img
                          src={`/basepath/${data?.thumbnail}`}
                          width={"100%"}
                          alt="img not found"
                          className="min-h-[151px]"
                        />

                        <h6 className="mt-2 truncate"> {data?.title}</h6>

                        <div className="flex justify-between">
                          <p className="text-black">
                            {" "}
                            {data?.module_section.map((a) => {
                              return a.course_modules.length;
                            })}{" "}
                            Lectures
                          </p>
                          <a
                            href={`https://www.iid.org.in/courses/${data?.slug}`}
                          >
                            <p className="text-orange">Explore More</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                });
              }
            )}
          </Carousel>
        </div>
      </Loader>
    </div>
  );
};

export default franchiseCourse;
