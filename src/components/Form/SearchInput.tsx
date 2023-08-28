'use client';
import search from "@/assets/search.svg";
import { ChangeEvent, useEffect, useState } from "react";

import Image from "next/image";

import useDebounce from "@/hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setQueryParam } from "@/redux/slice/productSlice";

const SearchInput = () => {
  const { queryParameters } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 1000);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueInput = e.target.value;
    setSearchTerm(valueInput);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handlePathChange = async () => {
    const queryParams = {
      ...queryParameters,
      searchTerm: debouncedSearchTerm as string,
    };
    dispatch(setQueryParam({ queryParameters: queryParams }));
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
