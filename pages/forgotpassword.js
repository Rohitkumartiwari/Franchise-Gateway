import Image from "next/image";
import img from "../public/Images/login/login-illustrator.png";
import message from "./../public/Images/login/message.png";
import passwordd from "./../public/Images/login/password.png";
import Link from "next/link";
import React, { useEffect } from "react";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Context, { useAuthGloabalContext } from "../context/authContext";
const ForgotPassword = () => {
  const {
    getMobileVerify,
    mobileVerify,
    errors,
    redirectRegister,
    login,
    auth,
    isAuthenticated,
    sendOtp,
    otpLoading,
    verifyOtp,
    otpVerifiedStatus,
    userMobile,
    resendOtp,
    forgotWebPassword,
    forgetloading,
    resetPassword,
    IsPassword,
  } = useAuthGloabalContext();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [confirmPass, setConfirmPass] = useState("");
  const [mobile, setMobile] = useState(userMobile);
  const [toggle, setToggle] = useState(true);
  const [mobileError, setMobileError] = useState("");
  useEffect(() => {
    setMobileError(errors?.password);
  }, [errors]);
  const handleOTPChange = async (value) => {
    if (!isNaN(value)) {
      setOtp(value);
    }
  };
  useEffect(() => {
    if (mobileVerify) {
      sendOtp(`91${mobile}`);
    }
  }, [mobileVerify]);
  useEffect(() => {
    if (otp.length === 4) {
      verifyOtp(mobile, otp);
    }
  }, [otp]);
  useEffect(() => {
    if (!mobile) {
      router.push("/login");
    }
  }, [mobile]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      mobile: mobile,
      otp: otp,
      password: password,
      password_confirmation: confirmPass,
    };

    forgotWebPassword(data);
  };
  useEffect(() => {
    if (IsPassword) {
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  }, [IsPassword]);
  const handleResendOtp = () => {
    toast.success("OTP Resent Successfully ");
    resendOtp(`91${mobile}`);
  };
  return (
    <div className="bg-slate">
      <div className="grid grid-cols-[.6fr_auto]">
        <div className="bg-white flex items-center">
          <div className="container py-[50px] ">
            <h4 className=" mb-8">Forgot Password</h4>
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
            {!otpVerifiedStatus ? (
              <button
                className="btn text-primary d-block p-0 min-text my-3"
                onClick={handleResendOtp}
              >
                {otpLoading ? "Loading..." : "Resend OTP"}
              </button>
            ) : null}
            <div className="text-[#555555] text-base mb-1">Password</div>
            <div className="relative ">
              <input
                type="password"
                id="password"
                name="password"
                className="bg-slate border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="absolute top-0 right-0 h-full px-3 rounded bg-orange flex items-center">
                <div className="relative ">
                  <Image
                    src={passwordd}
                    width={20}
                    height={20}
                    alt="image not found"
                  />
                </div>
              </div>
            </div>
            <div className="text-[#555555] text-base mb-1">
              Confirm Password
            </div>
            <div className="relative ">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="bg-slate border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                required
                onChange={(e) => setConfirmPass(e.target.value)}
                value={confirmPass}
              />
              <div className="absolute top-0 right-0 h-full px-3 rounded bg-orange flex items-center">
                <div className="relative ">
                  <Image
                    src={passwordd}
                    width={20}
                    height={20}
                    alt="image not found"
                  />
                </div>
              </div>
            </div>
            {mobileError && (
              <span className="text-danger">{mobileError[0]}</span>
            )}

            <div
              className="bg-orange text-white px-5 py-2 text-center my-10 rounded-md cursor-pointer"
              onClick={handleSubmit}
            >
              Reset Password
            </div>
          </div>
        </div>
        <div className="relative py-[50px] mx-auto">
          <Image src={img} width={550} height={550} alt="image not found" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
