"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setQueryParam, setResultItems } from "@/redux/slice/productSlice";
import { store } from "@/redux/store";
import { getProducts } from "../../../app/api/getProducts";

const maxPage = [1, 2, 3, 4, 5];

export default function PaginationTable() {
  const { tokenAuth } = useSelector((state: RootState) => state.auth);
  const { queryParameters } = useSelector((state: RootState) => state.product);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [numberPage, setNumberPage] = useState<number>(0);
  const [pageActive, setPageActive] = useState<number>(1);
  const dispatch = useDispatch();
  const router = useRouter();
  const url = useSearchParams();
  const sortTypeUrl = url.get("sortType");
  const searchTermUrl = url.get("searchTerm");
  const handleChangePagination = async (index: number) => {
    const indexPage = index + 4 * numberPage;
    setPageActive(indexPage);
    const queryParams = {
      ...queryParameters,
      sortType: sortTypeUrl === null ? null : sortTypeUrl,
      page: indexPage,
      searchTerm: searchTermUrl === null ? null : searchTermUrl,
    };
    const response = await getProducts(queryParams, tokenAuth);
    const result = response?.data.items;
    dispatch(
      setResultItems({ queryParameters: queryParams, resultItems: result })
    );
    router.push(
      `/products?searchTerm=${searchTermUrl}&page=${indexPage}&sortType=${sortTypeUrl}&sortBy=${queryParameters.sortBy}&active=${queryParameters.active}`
    );
  };

  const config = {
    headers: {
      Authorization: `Bearer ${tokenAuth}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data: response } = await axios.get(
        `http://localhost:3333/products`,
        config
      );
      const number = Math.round(
        response.pagination.totalItem / response.pagination.limit / 5
      );
      setTotalPage(number);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePreviousPage = () => {
    if (numberPage > 0) setNumberPage((numberPage) => numberPage - 1);
    return;
  };
  const handleNextPage = () => {
    if (numberPage < totalPage) setNumberPage((numberPage) => numberPage + 1);
    return;
  };

  return (
    <nav
      aria-label="Page navigation example"
      className="py-4 flex justify-center items-center"
    >
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <p
            onClick={handlePreviousPage}
            className="cursor-pointer flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </p>
        </li>
        {maxPage.map((item, index) => (
          <li key={item} onClick={() => handleChangePagination(item)}>
            <p
              className={`z-10 flex items-center justify-center px-3 h-8 leading-tight  cursor-pointer
            
            ${
              item + 4 * numberPage === pageActive
                ? "  text-blue-600 border border-blue-300 bg-blue-50"
                : ""
            }
             hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
            >
              {item + 4 * numberPage}
            </p>
          </li>
        ))}

        <li>
          <p
            onClick={handleNextPage}
            className="cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </p>
        </li>
      </ul>
    </nav>
  );
}
