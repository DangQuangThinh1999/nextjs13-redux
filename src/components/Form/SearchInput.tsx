"use client";
import search from "@/assets/search.svg";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import useDebounce from "@/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts } from "../../../app/api/getProducts";
import { setResultItems } from "@/redux/slice/productSlice";

const SearchInput = () => {
  const { tokenAuth } = useSelector((state: RootState) => state.auth);
  const { queryParameters } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const router = useRouter();
  const url = useSearchParams();
  const sortTypeUrl = url.get("sortType");
  const pageUrl = url.get("page");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value;
    setSearchTerm(valueInput);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePathChange = async () => {
    if (debouncedSearchTerm?.length === 0) {
      dispatch(
        setResultItems({ queryParameters: queryParameters, resultItems: [] })
      );
    }
    const queryParams = {
      ...queryParameters,
      sortType: sortTypeUrl === null ? null : sortTypeUrl,
      page: pageUrl === null ? null : +pageUrl,
      searchTerm: debouncedSearchTerm as string,
    };
    const response = await getProducts(queryParams, tokenAuth);
    const result = response?.data.items;
    dispatch(
      setResultItems({ queryParameters: queryParams, resultItems: result })
    );
    router.push(
      `/products?searchTerm=${debouncedSearchTerm}&page=${pageUrl}&sortType=${sortTypeUrl}&sortBy=${queryParameters.sortBy}&active=${queryParameters.active}`
    );
  };
  useEffect(() => {
    handlePathChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);
  return (
    <div>
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <Image
            src={search}
            height={6}
            width={6}
            className="h-6 w-6"
            alt="Search"
          />
        </div>
        <input
          onChange={handleInputChange}
          value={searchTerm}
          className="block w-[400px] p-4 pl-10 text-sm text-gray-900 border
           border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500
            focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={`Search Name Product...`}
          required
        />
        <button
          onClick={handlePathChange}
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchInput;
