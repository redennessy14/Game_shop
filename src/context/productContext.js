import axios from "axios";
import React, { useContext, useReducer } from "react";
export const productsContext = React.createContext();
export const useProduct = () => {
  return useContext(productsContext);
};
const API = "http://localhost:8000";

const ProductsContextProvider = ({ children }) => {
  const INIT_STATE = {
    products: [],
  };

  function reducer(state = INIT_STATE, action) {
    switch (action.type) {
      case "GET_PRODUCTS":
        return {
          ...state,
          products: action.payload.data,
          // pages: Math.ceil(action.payload.total / LIMIT),
        };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const createProduct = async (product) => {
    try {
      await axios.post(`${API}/products`, product);
    } catch (error) {
      console.log(error);
    }
  };
  const getProducts = async () => {
    try {
      const res = await axios(`${API}/products`);
      // , {
      //   params: {
      //     q: search,
      //     ...(category ? { category } : null),
      //     ...(_page && { _page }),
      //   },
      // });

      dispatch({
        type: "GET_PRODUCTS",
        payload: { data: res.data },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <productsContext.Provider
      value={{ products: state.products, createProduct, getProducts }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
