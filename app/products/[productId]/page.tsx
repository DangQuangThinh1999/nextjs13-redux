import { Suspense } from "react";

import type { Metadata } from "next";

import { notFound } from "next/navigation";
import { store } from "@/redux/store";
import { cookies } from "next/headers";
import { getProductById } from "../../api/getProducts";

type Params = {
  params: {
    productId: string;
  };
};

export async function generateMetadata({
  params: { productId },
}: Params): Promise<Metadata> {
  const query = store.getState().product.queryParameters;
  const token = cookies().get("access_token")?.value;

  const response = await getProductById(productId, token);

  if (response?.data) {
    return {
      title: "product Not Found",
    };
  }

  return {
    title: response?.data?.name,
    description: `This is the page of ${response?.data?.name}`,
  };
}

export default async function ProductIdPage({ params: { productId } }: Params) {
  const token = cookies().get("access_token")?.value;
  const response = await getProductById(productId, token);
  if (!response?.data.id) notFound();
  return (
    <>
      <h1>{response?.data.id}</h1>
      <h2>{response?.data.name}</h2>

      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <h3>{response?.data.price}</h3>
      </Suspense>
    </>
  );
}
