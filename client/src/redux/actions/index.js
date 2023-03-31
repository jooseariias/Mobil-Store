import axios from "axios";

export const GET_PHONES = "GET_PHONES";
export const GET_DETAIL = "GET_DETAIL";
export const GET_BRANDS = "GET_BRANDS";
export const POST_PHONE = "POST_PHONE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RELEASED = "ORDER_BY_RELEASED";
export const TIDY_PRICE = "TIDY_PRICE";
export const FILTER_BRANDS = "FILTER_BRANDS";
export const GET_COLORES = "GET_COLORES";
export const GET_CAPACITY = "GET_CAPACITY";

export function getPhones(){
    return async function (dispatch) {
      let Json = await axios.get(`http://localhost:3001/product`);
      dispatch({
        type: GET_PHONES,
        payload: Json.data,
      });
    }
  }

  export function getDetail(id) {
    return async function(dispatch) {
        const json = await axios(`http://localhost:3001/product/${id}`);
        return dispatch({
            type: GET_DETAIL,
            payload: json.data
        });
    };
  };

  export function getBrands() {
    return async function (dispatch) {
      let json = await axios.get(`http://localhost:3001/brand`);
      dispatch({
        type: GET_BRANDS,
        payload: json.data,
      });
    };
  }

  export function PostPhone(payload) {
    var json = axios.post(`http://localhost:3001/product`, payload);
    return { type: POST_PHONE, payload: json };
  }

  export function getColores() {
    return async function (dispatch) {
      let json = await axios.get(`http://localhost:3001/color`);
  
      dispatch({
        type: GET_COLORES,
        payload: json.data,
      }); 
    };
  }
  
  export function getCapacity() {
    return async function (dispatch) {
      let json = await axios.get(`http://localhost:3001/capacity`);
  
      dispatch({
        type: GET_CAPACITY,
        payload: json.data,
      }); 
    };
  }

  export function TidyAlphabetically(payload) {
    return {
      type: ORDER_BY_NAME,
      payload,
    };
  }

  export function TidyReleased(payload) {
    return {
      type: ORDER_BY_RELEASED,
      payload,
    };
  }

  export function TidyPrice(payload) {
    return {
      type: TIDY_PRICE,
      payload,
    };
  }
  
  export function FilterBrands(payload) {
    return {
      type: FILTER_BRANDS,
      payload,
    };
  }