import { IPagination, IProduct, IQueryParams } from "@/types";

// src/features/counterSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface IProductContextDefault {
  queryParameters: IQueryParams;

  items?: IProduct[];
  pagination?: IPagination;
}
const initialState: IProductContextDefault = {
  items: [],
  queryParameters: {
    searchTerm: "",
    page: 1,
    sortType: "asc",
    sortBy: "name",
    active: true,
  },
};

const productSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSnapShotProduct: (
      state: IProductContextDefault,
      action: PayloadAction<IProductContextDefault>
    ) => {
      state.items = action.payload.items;
      state.pagination = action.payload.pagination;
    },
    setQueryParam: (
      state: IProductContextDefault,
      action: PayloadAction<IProductContextDefault>
    ) => {
      state.queryParameters = action.payload.queryParameters;
    },
  },
});

export const { setSnapShotProduct, setQueryParam } = productSlice.actions;

export default productSlice.reducer;
