import React, { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import img from "../public/Images/login/login-illustrator.png";
import message from "../public/Images/login/message.png";
import passwordd from "../public/Images/login/password.png";
import OtpInput from "react-otp-input";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Context, { useAuthGloabalContext } from "../context/authContext";
const Login = () => {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [toggle, setToggle] = useState(true);
  const [otp, setOtp] = useState("");
  const [mobileError, setMobileError] = useState("");
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
    resendOtp,
    resendotp,
    isVerified,
  } = useAuthGloabalContext();

  useEffect(() => {
    if (errors) {
      setMobileError(errors?.mobile);
    }
  }, [errors]);
  const checkNumber = () => {
    getMobileVerify(`91${mobile}`);
  };
  useEffect(() => {
    if (redirectRegister) {
      router.push("/register");
    }
  }, [redirectRegister]);
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (mobileVerify && !toggle) {
      sendOtp(`91${mobile}`);
    }
  }, [mobileVerify, toggle]);
  useEffect(() => {
    if (otpVerifiedStatus) {
      handleLogin();
    }
  }, [otpVerifiedStatus]);
  const handleOTPChange = (value) => {
    if (!isNaN(value)) {
      setOtp(value);
      if (value.length === 4) {
        verifyOtp(`91${mobile}`, value);
      }
    }
  };
  const handleLogin = () => {
    login(`91${mobile}`, password, toggle ? "password" : "otp");
  };
  const handleResendOtp = () => {
    toast.success("OTP Resent Successfully ");
    resendOtp(`91${mobile}`);
  };
  return (
    <div className="bg-slate">
      <ToastContainer />
      <div className="grid md:grid-cols-[.6fr_auto]  grid-cols-1 ">
        <div className="bg-white flex items-center">
          <div className="container py-[50px] ">
            <h4 className="mb-8">LOG IN</h4>
            <div className="text-[#555555] text-base mb-1">Mobile Number</div>
            <div className="relative mb-5">
              <input
                type="number"
                id="email"
                name="email"
                className="bg-slate border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                required
                onChange={(e) => setMobile(e.target.value)}
              />

              <div className="absolute top-0 right-0 h-full px-3 rounded bg-orange flex items-center">
                <div className="relative ">
                  <Image
                    src={message}
                    width={20}
                    height={20}
                    alt="img not found"
                  />
                </div>
              </div>
            </div>
            {mobileVerify ? null : (
              <>
                {mobileError && (
                  <span className="text-danger">{mobileError[0]}</span>
                )}
              </>
            )}

            {mobileVerify && (
              <span className="text-primary font-semibold">
                Hello {mobileVerify}
              </span>
            )}
            {!mobileVerify && (
              <div
                className="bg-orange text-white px-5 py-2 text-center my-5 rounded-md cursor-pointer"
                onClick={checkNumber}
              >
                Continue
              </div>
            )}
            {mobileVerify && (
              <>
                {!toggle ? (
                  <>
                    <h5 className="mt-4 text-primary mb-2">OTP</h5>
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
                        className="btn text-primary d-block p-0 text-base my-3"
                        onClick={handleResendOtp}
                      >
                        {otpLoading ? "Loading..." : "Resend OTP"}
                      </button>
                    ) : null}
                    <br />
                    {isVerified && (
                      <Link
                        href="/forgotpassword"
                        className="text-primary text-end my-3 "
                      >
                        Forgot Password
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <div className="text-[#555555] text-base mb-1 mt-2">
                      Password
                    </div>
                    <div className="relative mb-3">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-slate border focus:outline-gray border-gray text-gray-900 text-sm rounded-lg  focus:border-none block w-full p-2.5 dark:bg-slate-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className="absolute top-0 right-0 h-full px-3 rounded bg-orange flex items-center">
                        <div className="relative ">
                          <Image
                            src={passwordd}
                            width={20}
                            height={20}
                            alt="img not found"
                          />
                        </div>
                      </div>
                    </div>
                    {mobileError && (
                      <span className="text-danger">{mobileError[0]}</span>
                    )}
                    <div className="flex justify-between">
                      <div className="text-end">
                        <Link
                          href="/forgotpassword"
                          className="font-sm text-blue-600  dark:text-blue-500 hover:no-underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <div className="text-end">
                        <div
                          className="font-sm text-blue-600  dark:text-blue-500 hover:no-underline cursor-pointer"
                          onClick={() => setToggle(false)}
                        >
                          Sign In With OTP
                        </div>
                      </div>
                    </div>
                    <div
                      className="bg-orange text-white px-5 py-2 text-center my-5 rounded-md cursor-pointer"
                      onClick={handleLogin}
                    >
                      Login Now
                    </div>
                    {/* <div class="flex items-center py-4">
                      <div class="flex-grow h-px bg-gray"></div>

                      <span className="mx-5 text-gray">OR</span>

                      <div class="flex-grow h-px bg-gray"></div>
                    </div> */}
                    {/* <Link href="/register" passHref>
                      <div className="bg-white text-orange  border border-orange px-5 py-2 text-center my-5 rounded-md">
                        SingUp Now
                      </div>
                    </Link> */}
                  </>
                )}
              </>
            )}
          </div>
        </div>
        <div className="relative py-[50px] mx-auto">
          <Image src={img} width={550} height={550} alt="img not found" />
        </div>
      </div>
    </div>
  );
};

export default Login;
