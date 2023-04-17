import { toast } from "react-toastify";
const authReducer = (state, action) => {
  switch (action.type) {
    case "GET_MOBILE_VERIFY_PENDING":
      return { ...state, loading: true };
    case "GET_MOBILE_VERIFY_FULFILLED":
      return {
        ...state,
        mobileVerify: action.payload.name,
        loading: false,
        redirectRegister: action.payload.redirectRegister ? true : false,
        errors: {},
        userMobile: action.mobile,
      };

    case "GET_MOBILE_VERIFY_REJECTED":
      {
        if (action.payload.status === 422) {
          return {
            ...state,
            errors: action.payload.data.errors,
            loading: false,
          };
        } else {
          return {
            ...state,
            errors: action.payload.data,
            loading: false,
          };
        }
      }

      break;
    case "LOGIN":
      return { ...state, loading: true, errors: {} };
    case "LOGIN_FULFILLED":
      localStorage.setItem(
        "iid",
        JSON.stringify({ ...state.auth, user: action.payload?.user })
      );
      return {
        ...state,
        auth: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };

    case "LOGIN_REJECTED": {
      if (action.payload.status === 422) {
        return {
          ...state,
          errors: action.payload.data.errors,
          loading: false,
        };
      } else {
        return {
          ...state,
          errors: action.payload.data,
          loading: false,
        };
      }
    }
    case "LOGOUT":
      localStorage.removeItem("iid");

      window.location.reload(true);
      return {
        ...state,
        errors: {},
        isAuthenticated: false,
        auth: {},

        redirectRegister: false,
      };
    case "SEND_OTP":
      return {
        ...state,
        otpLoading: true,
        errors: {},
      };
    case "SEND_OTP_FULFILLED":
      return {
        ...state,
        otpLoading: false,
      };
    case "SEND_OTP_REJECTED":
      return {
        ...state,
        errors: action.payload,
        otpLoading: false,
      };

    case "VERIFY_OTP":
      return {
        ...state,
        verifyOtploading: true,
        errors: {},
        otpVerifiedStatus: false,
      };
    case "VERIFY_OTP_FULFILLED":
      return {
        ...state,
        verifyOtp: action.data,
        verifyOtploading: false,
        otpVerifiedStatus: true,
      };
    case "VERIFY_OTP_REJECTED":
      if (action.payload.status === 422) {
        return {
          ...state,
          errors: action.payload.data.errors,
          verifyOtploading: false,
          otpVerifiedStatus: false,
        };
      } else {
        return {
          ...state,
          errors: action.payload.data,
          verifyOtploading: false,
          otpVerifiedStatus: false,
        };
      }

    case "RESEND_OTP":
      return {
        ...state,
        resendotp: false,
        otpLoading: true,
        errors: {},
      };
    case "RESEND_OTP_FULFILLED":
      return {
        ...state,
        resendotp: true,
        otpLoading: false,
      };
    case "RESEND_OTP_REJECTED":
      return {
        ...state,
        errors: action.payload.data,
        otpLoading: false,
      };

    case "REGISTER":
      return {
        ...state,
        loading: true,
        errors: {},
        userName: "",
        userMobile: "",
        verifyLoading: false,
        isVerified: false,
        redirectRegister: false,
      };
    case "REGISTER_FULFILLED":
      localStorage.setItem(
        "iid",
        JSON.stringify({
          ...action.payload.user,
        })
      );
      return {
        ...state,
        auth: action.payload.user,
        isAuthenticated: true,
        loading: false,
      };

    case "REGISTER_REJECTED":
      if (action.payload.status === 422) {
        return {
          ...state,
          errors: action.payload.data.errors,
          loading: false,
        };
      } else {
        return {
          ...state,
          errors: action.payload?.data,
          loading: false,
        };
      }

    case "FORGOT_PASSWORD":
      return {
        ...state,
        forgetloading: true,
        errors: {},
      };
    case "FORGOT_PASSWORD_FULFILLED":
      toast.success("Pasword Changed Successfully");
      return {
        ...state,
        forgetloading: false,
        resetPassword: action.payload,
        IsPassword: true,
        auth: {},
        userName: "",
        userMobile: "",
        isVerified: false,
        otpVerifiedStatus: false,
      };

    case "FORGOT_PASSWORD_REJECTED":
      if (action.payload.status === 422) {
        return {
          ...state,
          errors: action.payload.data.errors,
          forgetloading: false,
        };
      } else {
        return {
          ...state,
          errors: action.payload.data,
          forgetloading: false,
        };
      }

    default:
      return { ...state };
  }
};

export default authReducer;
