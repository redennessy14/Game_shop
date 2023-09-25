import axios from "axios";
import React, { useContext, useReducer } from "react";
import { toast } from "react-toastify";
export const productsContext = React.createContext();
export const useProduct = () => {
  return useContext(productsContext);
};
const API = "http://localhost:8000";

const ProductsContextProvider = ({ children }) => {
  const INIT_STATE = {
    products: [],
    baskets: [],
    categories: [],
  };

  function reducer(state = INIT_STATE, action) {
    switch (action.type) {
      case "GET_CATEGORIES":
        return {
          ...state,
          categories: action.payload,
        };
      case "GET_PRODUCTS":
        return {
          ...state,
          products: action.payload.data,
          // pages: Math.ceil(action.payload.total / LIMIT),
        };
      case "GET_BASKET":
        return {
          ...state,
          baskets: action.payload.data,
        };
      case "GET_PRODUCT":
        return {
          ...state,
          products: action.payload,
        };
      case "GET_CATEGORY":
        return {
          ...state,
          category: action.payload,
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
  const getBasket = async () => {
    try {
      const res = await axios(`${API}/baskets`);
      dispatch({
        type: "GET_BASKET",
        payload: { data: res.data },
      });
    } catch (error) {}
  };

  const editProduct = async (product, id) => {
    await axios.patch(`${API}/products/${id}`, product);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/products/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const addBasket = async (product) => {
    try {
      await axios.post(`${API}/baskets`, product);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromBasket = async (id) => {
    try {
      await axios.delete(`${API}/baskets/${id}`);
      await getBasket();
    } catch (error) {
      console.log(error);
    }
  };
  const getProductById = async (id) => {
    try {
      const { data } = await axios(`${API}/products/${id}`);
      dispatch({
        type: "GET_PRODUCT",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const createCategory = async (category) => {
    try {
      await axios.post(`${API}/categories`, category);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios(`${API}/categories`);
      dispatch({
        type: "GET_CATEGORIES",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCategoryById = async (id) => {
    try {
      const { data } = await axios(`${API}/categories/${id}`);
      dispatch({
        type: "GET_CATEGORY",
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditCategory = async (id, data) => {
    await axios.patch(`${API}/categories/${id}`, data);
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API}/categories/${id}`);
    } catch (error) {}
  };
  return (
    <productsContext.Provider
      value={{
        products: state.products,
        baskets: state.baskets,
        categories: state.categories,
        createProduct,
        getProducts,
        deleteProduct,
        editProduct,
        addBasket,
        removeFromBasket,
        getBasket,
        getProductById,
        getCategories,
        createCategory,
        handleEditCategory,
        deleteCategory,
        getCategoryById,
      }}
    >
      {children}
    </productsContext.Provider>
  );
};

export default ProductsContextProvider;
