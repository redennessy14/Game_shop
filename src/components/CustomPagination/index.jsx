import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { productsContext } from "../../context/productContext";

import "./style.css";
import { getPageCount } from "./helper";

const CustomPagination = () => {
  const { pages } = useContext(productsContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getPageCount(pages);
  }, []);

  const handleChangePage = (page) => {
    searchParams.set("_page", page);
    setSearchParams(searchParams);
    setCurrentPage(page);
  };

  const pageNumbers = getPageCount(pages);

  return (
    <div className="pagination">
      <button
        className="pagination_button"
        disabled={currentPage === 1}
        onClick={() => handleChangePage(currentPage - 1)}
      >
        Prev
      </button>
      {pageNumbers.map((item) => (
        <button
          key={item}
          className={currentPage === item ? "active" : ""}
          onClick={() => handleChangePage(item)}
        >
          {item}
        </button>
      ))}
      <button
        className="pagination_button"
        disabled={currentPage === pages}
        onClick={() => handleChangePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default CustomPagination;
