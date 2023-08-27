import { createSlice } from "@reduxjs/toolkit";

interface IModalContextData {
  isOpenModal: boolean;
}

const initialState: IModalContextData = {
  isOpenModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsOpenModal: (state: IModalContextData) => {
      state.isOpenModal = true;
    },
    setIsCloseModal: (state: IModalContextData) => {
      state.isOpenModal = false;
    },
  },
});

export const { setIsOpenModal, setIsCloseModal } = modalSlice.actions;

export default modalSlice.reducer;
