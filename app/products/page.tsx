import PaginationTable from "@/components/Pagination/Pagination";
import Table from "@/components/Table/Table";
import AddButton from "@/components/CustomButton/AddButton";
import SearchInput from "@/components/Form/SearchInput";
import { cookies } from "next/headers";
import { getProducts } from "../api/getProducts";
import { store } from "@/redux/store";
import { AxiosResponse } from "axios";
import { redirect, useSearchParams } from "next/navigation";

function Products({ response }: { response?: AxiosResponse<any, any> }) {
  if (!response) {
    redirect("auth/login");
  }
  return (
    <div>
      <div className="flex justify-between px-5 items-center">
        <PaginationTable />
        <SearchInput />
        <AddButton text="Add New" />
      </div>
      <Table data={response?.data.items} />
    </div>
  );
}

export default async function Page(props: any) {
  console.log("Page", props);// get params nextjs 13 to sever side
  const query = store.getState().product.queryParameters;
  const token = cookies().get("access_token")?.value;
  const response = await getProducts(query, token);
  return <Products response={response} />;
}
