import React, { useState, useEffect } from "react";
import Image from "next/image";
import img from "../public/Images/login/register.png";
import { useRouter } from "next/router";
import Context, { useAuthGloabalContext } from "../context/authContext";
import OtpInput from "react-otp-input";
const Register = () => {
  const router = useRouter();
  const { userMobile, sendOtp, verifyOtp, register, isAuthenticated } =
    useAuthGloabalContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(userMobile || "");
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const handleOTPChange = (value) => {
    if (!isNaN(value)) {
      setOtp(value);
    }
  };

  useEffect(() => {
    if (mobile) sendOtp(mobile);
  }, [mobile]);
  useEffect(() => {
    if (otp.length === 4) {
      verifyOtp(mobile, otp);
    }
  }, [otp]);
  useEffect(() => {
    if (!userMobile) {
      router.push("/login");
    }
  }, [userMobile]);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      email: email,
      mobile: mobile.slice(2, 12),
      otp: otp,
      pincode: pin,
      state: state,
      city: city,
      password: password,
      password_confirmation: confirmPass,
    };
    register(data);
  };
  return (
    <div className="bg-slate">
      <div className="grid grid-cols-[.6fr_auto]">
        <div className="bg-white flex items-center">
          <div className="container py-[50px] ">
            <h4 className="mb-8">Register Now</h4>
            <OtpInput
              value={otp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              onChange={(value) => handleOTPChange(value)}
              renderInput={(props) => <input {...props} />}
              inputStyle={{
                width: "100%",
                borderRadius: "6px",
                border: "1px solid orange",
                height: "38px",
              }}
            />
            <div className="mb-5">
              <div className="text-[#555555] text-base mb-1">FULL NAME</div>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-slate border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="mb-5">
              <div className="text-[#555555] text-base mb-1">Email</div>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-slate border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-5">
              <div className="text-[#555555] text-base mb-1">MOBILE NO</div>
              <input
                type="number"
                id="number"
                name="number"
                className="bg-slate border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                required
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
              />
            </div>

            <div
              className="bg-orange text-white px-5 py-2 text-center mb-5 rounded-md"
              onClick={handleSubmit}
            >
              Register Now
            </div>
          </div>
        </div>
        <div className="relative py-[50px] mx-auto flex items-center">
          <Image src={img} width={500} height={300} />
        </div>
      </div>
    </div>
  );
};

export default Register;
