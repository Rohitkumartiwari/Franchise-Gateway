import React from "react";
import axios from "axios";
import { createContext, useContext, useState, useReducer } from "react";
import authReducer from "./authReducer";
export const AuthContextWrapper = createContext(null);
let auth;
const ISSERVER = typeof window === "undefined";
if (!ISSERVER) {
  auth = localStorage.getItem("iid");
}
const initialState = {
  auth: !!auth ? JSON.parse(auth) : {},
  isAuthenticated: !!auth,
  mobileVerify: "",
  errors: {},
  loading: false,
  redirectRegister: false,
  user: {},
  otpLoading: false,
  verifyOtploading: false,
  otpVerifiedStatus: false,
  resendotp: false,
  userMobile: "",
  userName: "",
  forgetloading: false,
  resetPassword: "",
  IsPassword: false,
  isVerified: true,
};
const authContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const {
    mobileVerify,
    errors,
    redirectRegister,
    auth,
    isAuthenticated,
    otpLoading,
    verifyOtploading,
    otpVerifiedStatus,
    resendotp,
    userMobile,
    forgetloading,
    resetPassword,
    IsPassword,
    isVerified,
  } = state;

  const getMobileVerify = (mobile) => {
    dispatch({
      type: "GET_MOBILE_VERIFY_PENDING",
    });
    axios
      .post("/api/mobile-login", { mobile })
      .then((response) => {
        dispatch({
          type: "GET_MOBILE_VERIFY_FULFILLED",
          payload: response.data,
          mobile,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_MOBILE_VERIFY_REJECTED",
          payload: err.response,
        });
      });
  };
  const login = (mobile, password, type) => {
    dispatch({
      type: "LOGIN_PENDING",
    });
    axios
      .post("/api/login", {
        mobile,
        password,
        type,
      })
      .then((response) => {
        dispatch({
          type: "LOGIN_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "LOGIN_REJECTED",
          payload: err.response,
        });
      });
  };
  const logOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  const sendOtp = (mobile) => {
    dispatch({
      type: "SEND_OTP",
    });
    axios
      .post("/api/sms-otp", {
        mobile,
      })
      .then((response) => {
        dispatch({
          type: "SEND_OTP_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "SEND_OTP_REJECTED",
          payload: err.response,
        });
      });
  };
  const verifyOtp = (mobile, otp) => {
    dispatch({
      type: "VERIFY_OTP",
    });
    axios
      .post("/api/verify-sms-otp", { mobile, otp })
      .then((response) => {
        dispatch({
          type: "VERIFY_OTP_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "VERIFY_OTP_REJECTED",
          payload: err.response,
        });
      });
  };

  const resendOtp = (mobile) => {
    dispatch({
      type: "RESEND_OTP",
    });
    axios
      .post("/api/sms-otp", {
        mobile,
      })
      .then((response) => {
        dispatch({
          type: "RESEND_OTP_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "RESEND_OTP_REJECTED",
          payload: err.response,
        });
      });
  };

  const register = (data) => {
    dispatch({
      type: "REGISTER",
    });
    axios
      .post("/api/register", data)
      .then((response) => {
        dispatch({
          type: "REGISTER_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "REGISTER_REJECTED",
          payload: err.response,
        });
      });
  };
  const forgotWebPassword = (data) => {
    dispatch({
      type: "FORGOT_PASSWORD",
    });
    axios
      .post("/api/forgot-password-web", data)
      .then((response) => {
        dispatch({
          type: "FORGOT_PASSWORD_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "FORGOT_PASSWORD_REJECTED",
          payload: err.response,
        });
      });
  };
  return (
    <AuthContextWrapper.Provider
      value={{
        getMobileVerify,
        mobileVerify,
        errors,
        redirectRegister,
        login,
        auth,
        isAuthenticated,
        logOut,
        sendOtp,
        otpLoading,
        verifyOtp,
        verifyOtploading,
        otpVerifiedStatus,
        resendOtp,
        resendotp,
        userMobile,
        register,
        forgotWebPassword,
        forgetloading,
        resetPassword,
        IsPassword,
        isVerified,
      }}
    >
      {children}
    </AuthContextWrapper.Provider>
  );
};

export default authContext;
export const useAuthGloabalContext = () => useContext(AuthContextWrapper);
