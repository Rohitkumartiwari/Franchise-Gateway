import React, { useState, useEffect } from "react";
import img1 from "../../public/Images/header.png";
import Image from "next/image";
import Sidebar from "./sidebar";
import { BiMenuAltRight } from "react-icons/bi";
import Context, { useAuthGloabalContext } from "../../context/authContext";
import Link from "next/link";
const header = () => {
  const { logOut, auth, isAuthenticated } = useAuthGloabalContext();
  const [authenticated, setAuthenicated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handlelogout = () => {
    logOut();
  };
  useEffect(() => {
    setAuthenicated(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <div className="  h-16 bg-orange text-white    ">
        <div className=" container items-center flex justify-between">
          {authenticated ? (
            <Link href="/" passHref>
              <Image src={img1} height={60} width={220} alt="img not found" />
            </Link>
          ) : (
            <Image src={img1} height={60} width={220} alt="img not found" />
          )}
          <div className="md:flex gap-x-4  hidden items-center">
            <a href="https://www.iid.org.in/events">Events</a>
            <a href="https://www.iid.org.in/goverment-schemes">Schemes</a>
            <a href="https://www.iid.org.in/industrial-reports/technical-reports">
              Industrial Reports
            </a>
            <a href="https://www.iid.org.in/contact-us">Contacts</a>
            {!authenticated && (
              <Link href="/register" passHref>
                Register
              </Link>
            )}

            {!authenticated ? (
              <Link href="/login" passHref>
                Login
              </Link>
            ) : (
              <div onClick={handlelogout} className="cursor-pointer">
                Log Out
              </div>
            )}
          </div>
          <div className="block md:hidden group">
            <BiMenuAltRight
              fontSize={30}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            />
          </div>
        </div>
      </div>
      {/* <Sidebar sidebarOpen={sidebarOpen} /> */}
    </>
  );
};

export default header;
