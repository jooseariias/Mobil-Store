

import{
    GET_PHONES, 
    GET_DETAIL,
    GET_BRANDS,
    POST_PHONE,
    ORDER_BY_NAME,
    ORDER_BY_RELEASED,
    TIDY_PRICE,
    FILTER_BRANDS,
    CLEAN_DETAIL
}from"../actions/index"

const initialState = {
    Phones: [],
    PhonesCopy: [],
    Brands: [],
    details: []
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
  
      case GET_PHONES:
        console.log(action.paylod)
        return {
          ...state,
          Phones: action.payload,
          PhonesCopy: action.payload,
        };
  
      case GET_DETAIL:
        return{
          ...state,
          details: action.payload
        }

      case CLEAN_DETAIL:
        return{
          ...state,
          details: action.payload
        }
  
  
    //   case POST_PHONE:
    //     return {
    //       ...state,
    //       Phones: action.payload,
    //       PhonesCopy: action.payload,
    //     };
  

      case GET_BRANDS:
        return {
          ...state,
          Brands: action.payload,
        };
  
 
  
      case POST_PHONE:
        return {
          ...state,
        };
  
      //reducers de ordenamiento
  
      case ORDER_BY_NAME:
        console.log("1");
        let order =
          action.payload === "asc"
            ? state.PhonesCopy.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : state.PhonesCopy.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return -1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          PhonesCopy: order,
        };
  
      case ORDER_BY_RELEASED:
        let orderByReleased =
          action.payload === "asc"
            ? state.PhonesCopy.sort(function (a, b) {
                if (a.year.toLowerCase() > b.year.toLowerCase()) {
                  return 1;
                }
                if (b.year.toLowerCase() > a.year.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : state.PhonesCopy.sort(function (a, b) {
                if (a.year.toLowerCase() > b.year.toLowerCase()) {
                  return -1;
                }
                if (b.year.toLowerCase() > a.year.toLowerCase()) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          PhonesCopy: orderByReleased,
        };
  
      case TIDY_PRICE:
        let TidyPrice =
          action.payload === "min"
            ? state.PhonesCopy.sort(function (a, b) {
                if (a.price > b.price) {
                  return 1;
                }
                if (b.price > a.price) {
                  return -1;
                }
                return 0;
              })
            : state.PhonesCopy.sort(function (a, b) {
                if (a.price > b.price) {
                  return -1;
                }
                if (b.price > a.price) {
                  return 1;
                }
                return 0;
              });
        return {
          ...state,
          PhonesCopy: TidyPrice,
        };
  
      //reduces de filtrados
  
  
      case FILTER_BRANDS:
        const Allbran = state.PhonesCopy;
        const TypePhonesFilter =
          action.payload === "all"
            ? Allbran
            : Allbran?.filter((t) => t.brand.includes(action.payload));
        return {
          ...state,
          PhonesCopy: TypePhonesFilter,
        };

  
      default: {
        return state;
      }
    }
  }
  
  export default rootReducer;