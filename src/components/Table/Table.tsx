"use client";
import React, { useState } from "react";

import { IProduct } from "@/types";
import TableItem from "./TableItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";
import { setQueryParam } from "@/redux/slice/productSlice";
import { useRouter } from "next/navigation";

interface ITableProps {
  data?: IProduct[];
}
const Table: React.FC<ITableProps> = ({ data }) => {
  const { queryParameters } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const [sort, setSort] = useState(false);
  const router = useRouter();
  const handleSortName = () => {
    setSort((value) => !value);
    const queryParams = {
      ...queryParameters,
      sortType: sort ? "desc" : "asc",
    };
    dispatch(setQueryParam({ queryParameters: queryParams }));
  };
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
      <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Id
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Image
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900 flex "
            >
              <p className="mr-2">Name</p>

              <button
                onClick={handleSortName}
                className="rounded-full hover:bg-gray-200 p-1  w-6"
              >
                {!sort ? <ArrowLongDownIcon /> : <ArrowLongUpIcon />}
              </button>
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              State
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Price
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium text-gray-900"
            ></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {data?.map((item, index) => (
            <TableItem
              key={index}
              price={item.price}
              productImage={item.ProductImage}
              name={item.name}
              active={item.active}
              id={item.id}
            />
          ))}
        </tbody>
      </table>
      {data === undefined && (
        <div className="bg-gray-200 w-full h-[500px] flex items-center justify-center shadow-md">
          <p
            className="h-[200px] w-[400px]  rounded border border-dashed items-center justify-center flex
 border-[#3C50E0]"
          >
            NO DATA
          </p>
        </div>
      )}
    </div>
  );
};

export default Table;
