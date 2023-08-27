"use client";
import { ISnapshotProduct } from "@/types";
import PaginationTable from "@/components/Pagination/Pagination";
import { useSelector } from "react-redux";
import Table from "@/components/Table/Table";
import AddButton from "@/components/CustomButton/AddButton";
import SearchInput from "@/components/Form/SearchInput";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { getProducts } from "../api/getProducts";

export default function Products() {
  const { tokenAuth } = useSelector((state: RootState) => state.auth);
  const { queryParameters } = useSelector((state: RootState) => state.product);

  const [result, setResult] = useState<ISnapshotProduct>();

  const handleFetchData = async () => {
    const response = await getProducts(queryParameters, tokenAuth);
    setResult(response.data);
  };
  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParameters]);
  return (
    <div>
      <div className="flex justify-between px-5 items-center">
        <PaginationTable />
        <SearchInput />
        <AddButton text="Add New" />
      </div>
      <Table data={result?.items} />
    </div>
  );
}
