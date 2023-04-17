import { createContext, useContext, useState, useReducer } from "react";
import indexReducer from "./indexReducer";
export const ContextWrapper = createContext(null);
import axios from "axios";
const initialState = {
  francises: [],
  trendingFranchise: [],
  getBrandData: [],
  getfrnachiseCourses: [],
  franchiseDetailContentDocuments: [],
  franchiseDetailContents: [],
  sectorsList: [],
  allFranchiseList: [],
  amountList: [],
  completeFranchsieList: [],
  loading: false,
};
function Context({ children }) {
  const [message, setMessage] = useState([]);
  const [state, dispatch] = useReducer(indexReducer, initialState);
  const {
    francises,
    getBrandData,
    getfrnachiseCourses,
    franchiseDetailBrand,
    franchiseDetailContentDocuments,
    franchiseDetailContents,
    sectorsList,
    allFranchiseList,
    amountList,
    completeFranchsieList,
    loading,
  } = state;
  const getFranchise = () => {
    axios
      .get("/api/franchise-web-sector?requestFrom=home")
      .then((response) => {
        dispatch({ type: "GET_DATA", payload: response.data });
      })
      .catch((err) => console.log(err));
  };

  // const getMobileVerify = (mobile) => {
  //   dispatch({
  //     type: "GET_MOBILE_VERIFY_PENDING",
  //   });
  //   axios
  //     .post("/api/mobile-login", { mobile })
  //     .then((response) => {
  //       dispatch({
  //         type: "GET_MOBILE_VERIFY_FULFILLED",
  //         payload: response.data,
  //         mobile,
  //       });
  //     })
  //     .catch((err) => {
  //       dispatch({
  //         type: "GET_MOBILE_VERIFY_REJECTED",
  //         payload: err.response,
  //       });
  //     });
  // };

  const getFranchiseBrand = () => {
    dispatch({
      type: "GET_BRAND_DATA",
    });

    axios
      .get("/api/get-web-franchiseBrand?requestFrom=home")
      .then((response) => {
        dispatch({
          type: "GET_BRAND_DATA_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_BRAND_DATA_REJECTED",
          payload: err.response,
        });
      });
  };

  const getFranchiseCourses = () => {
    dispatch({
      type: "GET_FRANCHISE_COURSES",
    });
    axios
      .get("/api/get-franchiseCourses")
      .then((response) => {
        dispatch({
          type: "GET_FRANCHISE_COURSES_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_FRANCHISE_COURSES_REJECTED",
          payload: err.response,
        });
      });
  };
  const getFranchiseDetail = (slug) => {
    dispatch({
      type: "GET_FRANCHISE_DETAIL",
    });
    axios
      .get(`/api/franchise-details/${slug}`)
      .then((response) => {
        dispatch({
          type: "GET_FRANCHISE_DETAIL_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_FRANCHISE_DETAIL_REJECTED",
          payload: err.response,
        });
      });
  };
  const getSectors = () => {
    axios
      .get(`/api/franchise-web-sector`)
      .then((resp) => {
        dispatch({ type: "GET_SECTORS", payload: resp.data });
      })
      .catch((err) => console.log(err));
  };
  const getAllFranchiseList = (id, filter, page, range, location) => {
    dispatch({
      type: "GET_ALL_FRANCHISE_LIST",
    });

    axios
      .get(
        // `/api/get-web-franchiseBrand?paginate=20&sort=asc&sub_category=${id}&subSubCategory=&filter=${filter}&page=${page}&min=${
        //   range?.[0] || ""
        // }&max=${range?.[1] || ""}&location=${location || ""}`
        `/api/get-franchiseBrand?category=26&sub_category=${id}&sub_sub_category=&sub_sub_sub_category=&amount=1&filter=${filter}&page=${page}&min=${
          range?.[0] || ""
        }&max=${range?.[1] || ""}&max=${range?.[1] || ""}&location=${
          location || ""
        }`
      )
      .then((response) => {
        dispatch({
          type: "GET_ALL_FRANCHISE_LIST_FULFILLED",
          payload: response.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "GET_ALL_FRANCHISE_LIST_REJECTED",
          payload: err.response,
        });
      });
  };
  const getAmountList = () => {
    axios
      .get(`/api/franchise-amounts/list`)
      .then((resp) => {
        dispatch({ type: "GET_AMOUNT_LIST", payload: resp.data });
      })
      .catch((err) => console.log(err));
  };
  const getCompleteFranchiseList = () => {
    axios
      .get(`/api/brand-name/list`)
      .then((resp) => {
        dispatch({ type: "GET_COMPLETE_FRANCHISE_LIST", payload: resp.data });
      })
      .catch((err) => console.log(err));
  };
  return (
    <ContextWrapper.Provider
      value={{
        message,
        setMessage,
        getFranchise,
        loading,
        getFranchiseBrand,

        francises,
        getBrandData,
        getFranchiseCourses,
        getfrnachiseCourses,
        getFranchiseDetail,
        franchiseDetailBrand,
        franchiseDetailContentDocuments,
        franchiseDetailContents,
        getSectors,
        sectorsList,
        getAllFranchiseList,
        allFranchiseList,
        getAmountList,
        amountList,
        getCompleteFranchiseList,
        completeFranchsieList,
        loading,
      }}
    >
      {children}
    </ContextWrapper.Provider>
  );
}

export default Context;

export const useGloabalContext = () => useContext(ContextWrapper);
