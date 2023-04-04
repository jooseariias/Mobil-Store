import{
    GET_PHONES, 
    GET_PHONE,
    GET_DETAIL,
    GET_BRANDS,
    POST_PHONE,
    ORDER_BY_NAME,
    ORDER_BY_RELEASED,
    TIDY_PRICE,
    FILTER_BRANDS,

    GET_COLORES,
    GET_CAPACITY,

    CLEAN_DETAIL,
    CLEAN_PHONES,
    FILTER_CAPACITY

}from"../actions/index"

const initialState = {
    Phones: [],
    PhonesCopy: [],
    Brands: [],
    Color:[],
    Capacity:[],
    details: []
};

function rootReducer(state = initialState, action){

    switch (action.type) {
  
      case GET_PHONES:
       
        return{
          ...state,
          Phones: action.payload,
          PhonesCopy: action.payload,
        };
      
      case GET_PHONE:

        return{
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

      case CLEAN_PHONES:
        return{
          ...state,
          PhonesCopy: state.Phones
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

        case GET_COLORES:
          return {
            ...state,
            Color: action.payload,
          };

          case GET_CAPACITY:
            return {
              ...state,
              Capacity: action.payload,
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
            ? state.Phones.sort(function (a, b) {
                if (a.name.toLowerCase() > b.name.toLowerCase()) {
                  return 1;
                }
                if (b.name.toLowerCase() > a.name.toLowerCase()) {
                  return -1;
                }
                return 0;
              })
            : state.Phones.sort(function (a, b) {
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
            ? state.Phones.sort(function (a, b) {
                if (a.year > b.year) {
                  return 1;
                }
                if (b.year > a.year) {
                  return -1;
                }
                return 0;
              })
            : state.Phones.sort(function (a, b) {
                if (a.year> b.year) {
                  return -1;
                }
                if (b.year > a.year) {
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
            ? state.Phones.sort(function (a, b) {
                if ( parseInt(a.price.toLowerCase()) > parseInt(b.price.toLowerCase())) {
                  return 1;
                }
                if (parseInt(b.price.toLowerCase()) > parseInt(a.price.toLowerCase())) {
                  return -1;
                }
                return 0;
              })
            : state.Phones.sort(function (a, b) {
                if (parseInt(a.price.toLowerCase()) > parseInt(b.price.toLowerCase())) {
                  return -1;
                }
                if (parseInt(b.price.toLowerCase()) > parseInt(a.price.toLowerCase())) {
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
        console.log("marca: ", action.payload);
        const TypePhonesFilter =
          action.payload === "all"
            ? Allbran
            : Allbran?.filter((t) => (state.Brands[t.brandId-1]?.name)?.includes(action.payload));

        return {
          ...state,
          PhonesCopy: TypePhonesFilter,
        };

      case FILTER_CAPACITY:

          const AllCap = state.PhonesCopy;
          console.log("Capacidad: ", action.payload);
          const TypePhonesFilterCapacidad =
          action.payload === "all"
            ? AllCap
            : AllCap?.filter((t) => (state.Capacity[t.storageCapacityId-1]?.capacity)?.includes(action.payload));

        return {
          ...state,
          PhonesCopy: TypePhonesFilterCapacidad,
        };


  
      default: {
        return state;
      }
    }
  }
  
  export default rootReducer;