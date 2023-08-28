import { ISnapshotProduct } from "@/types";
import PaginationTable from "@/components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import Table from "@/components/Table/Table";
import AddButton from "@/components/CustomButton/AddButton";
import SearchInput from "@/components/Form/SearchInput";
import { cookies } from 'next/headers';
import { RootState, persistor } from "@/redux/store";
// import { useEffect, useState } from "react";
import { getProducts } from "../api/getProducts";
import {store} from "@/redux/store"
import { AxiosResponse } from "axios";
import { redirect } from "next/navigation";

function Products({response}:{response?: AxiosResponse<any, any> }) {
  if(!cookies().get('access_token')?.value) redirect("/auth/login")
  if(!response) {
    persistor.purge(); 
    cookies().delete("access_token")
  }
  return (
    <div>
      <div className="flex justify-between px-5 items-center">
        {/* <PaginationTable />
        <SearchInput />
        <AddButton text="Add New" /> */}
      </div>
      <Table data={response?.data.items} />
    </div>
  );
}

export default async function Page({Params}:{Params:string}) {
  const query  = store.getState().product.queryParameters;
  const token = cookies().get('access_token')?.value;
  const response =  await getProducts(query, token);
  console.log(Params,response)
 
  return (<Products response={response}/>
  ) 
}