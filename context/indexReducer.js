const indexReducer = (state, action) => {
  switch (action.type) {
    case "GET_DATA":
      return { ...state, francises: action.payload?.sectors };
    // case "GET_DATA":
    //   state = {
    //     ...state,
    //     loading: true,

    //     errors: {},
    //   };
    //   break;
    // case "GET_DATA_FULFILLED":
    //   state = {
    //     ...state,
    //     loading: false,
    //     francises: action.payload?.sectors,
    //   };
    //   break;
    // case "GET_DATA_REJECTED":
    //   state = {
    //     ...state,
    //     loading: false,
    //     errors: action.payload.data,
    //   };
    //   break;
    case "GET_BRAND_DATA":
      return { ...state, loading: true };
    case "GET_BRAND_DATA_FULFILLED":
      return {
        ...state,
        getBrandData: action.payload?.getBrands,
        loading: false,
      };
    case "GET_BRAND_DATA_REJECTED":
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case "GET_FRANCHISE_COURSES":
      return {
        ...state,
        loading: true,
      };
    case "GET_FRANCHISE_COURSES_FULFILLED":
      return {
        ...state,
        getfrnachiseCourses: action.payload?.franchiseCourses,
        loading: false,
      };
    case "GET_FRANCHISE_COURSES_REJECTED":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case "GET_FRANCHISE_DETAIL":
      return {
        ...state,
        loading: true,
      };
    case "GET_FRANCHISE_DETAIL_FULFILLED":
      return {
        ...state,
        franchiseDetailBrand: action.payload?.brand,
        franchiseDetailContentDocuments: action.payload?.contentDocuments,
        franchiseDetailContents: action.payload?.contents,
        loading: false,
      };
    case "GET_FRANCHISE_DETAIL_REJECTED":
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case "GET_SECTORS":
      return {
        ...state,
        sectorsList: action.payload?.sectors,
      };
    case "GET_ALL_FRANCHISE_LIST":
      return {
        ...state,
        loading: true,
      };
    case "GET_ALL_FRANCHISE_LIST_FULFILLED":
      return {
        ...state,
        loading: false,
        allFranchiseList: action.payload?.getBrand,
      };
    case "GET_ALL_FRANCHISE_LIST_REJECTED":
      return {
        ...state,
        loading: false,
      };
    case "GET_AMOUNT_LIST":
      return {
        ...state,
        amountList: action.payload.amounts,
      };
    case "GET_COMPLETE_FRANCHISE_LIST":
      return {
        ...state,
        completeFranchsieList: action.payload.brands,
      };
    default:
      return state;
  }
};

export default indexReducer;
