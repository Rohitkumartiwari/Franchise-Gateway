import React from "react";
import img1 from "../../public/Images/header.png";
import img2 from "../../public/Images/Twitter Squared.png";

import img3 from "../../public/Images/Vector (3).png";
import img4 from "../../public/Images/Vector (4).png";
import Image from "next/image";
import Link from "next/link";
const footer = () => {
  return (
    <div className="bg-[#262626]  text-white items-center ">
      <div className="  grid xl:grid-cols-[30%_20%_20%_30%] w-full border-b-2 border-inherit pt-[30px]  md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2">
        <div className="w-full py-7 px-[70px] border-r-2 border-inherit">
          <Image src={img1} height={60} width={220} alt="img not found" />
          <p className="mt-4 text-white">
            Institute for Industrial Development (IID) is an incubator with the
            Government of India, Ministry of Micro, Small and Medium Enterprises
            (MSME) , and the department of start-ups, an initiative by the
            Government of Uttar Pradesh.IID is a unit of Samadhan Samiti working
            under Public Private Partnership with the Government since the year
            1999
          </p>
        </div>
        <div className="text-white border-r-2 border-inherit py-7 pl-5">
          <h4>Products And Services </h4>
          <div className="my-2">
            <a href="https://www.iid.org.in/industrial-solution">
              <p className="text-white">Industrial Solution</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/entrepreneur-development">
              <p className="text-white">EDP</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/industrial-consultancy">
              <p className="text-white"> Consultancy</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/courses">
              <p className="text-white">Courses</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/success-story">
              <p className="text-white">Success Story</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/milestone">
              <p className="text-white">Milestone</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/industrial-solution">
              <p className="text-white">Project Reports</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/services">
              <p className="text-white">Services</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/goverment-schemes">
              <p className="text-white">Schemes</p>
            </a>
          </div>
        </div>
        <div className="text-white border-r-2 border-inherit py-7 pl-5">
          <h4>Useful Links </h4>
          <div>
            <a href="/" passHref>
              <p className="text-white"> Home</p>
            </a>
          </div>

          <div className="my-2">
            <a href="https://www.iid.org.in/about">
              <p className="text-white">About Us</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/team">
              <p className="text-white">Team</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/association">
              <p className="text-white">Association</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/achievements">
              <p className="text-white">Achievements</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/events">
              <p className="text-white">Events</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/workshop">
              <p className="text-white">Workshop</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/blogs">
              <p className="text-white">Blogs</p>
            </a>
          </div>
          <div className="my-2">
            <a href="https://www.iid.org.in/webinar">
              <p className="text-white">Webinar</p>
            </a>
          </div>
        </div>
        <div className="text-white py-7 pl-5">
          <h4>Contact Us </h4>
          <h6 className="my-3">+91 7408733333, +91 7607655555, 0522 4935555</h6>
          <h6 className="my-3">
            Delhi Office : Multi Disciplinary Training Centre, Gandhi Darshan
            Rajghat, New Delhi 110002
          </h6>
          <h6 className="my-3">
            Lucknow Office : Samadhan Tower 27/1/B Gokhale Marg, Lucknow 226001
          </h6>
          <h6 className="my-3">
            Noida Office : A-18, First Floor Sector-6, Noida 201301
          </h6>
        </div>
      </div>
      <div className="flex px-[70px] py-3 justify-between">
        <h6 className=" ">Copyright © 2023 IID Mart. All Rights Reserved.</h6>
        <div className="flex gap-x-2">
          <div>
            <a
              href={"https://www.iid.org.in/contact-us"}
              className="d-flex align-items-center text-white  border-r-2 pr-2"
            >
              Feedback
            </a>
          </div>

          <div>
            <a
              href={"https://www.iid.org.in/disclaimer"}
              className="d-flex align-items-center text-white  border-r-2 pr-2"
            >
              Disclaimer
            </a>
          </div>
          <div>
            <a
              href={"https://www.iid.org.in/privacy"}
              className="d-flex align-items-center text-white border-r-2 pr-2"
            >
              Privacy Policy
            </a>
          </div>
          <div>
            <a
              href={"https://www.iid.org.in/term-conditions"}
              className="d-flex align-items-center text-white "
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
