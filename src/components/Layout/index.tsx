import React, { ReactNode, useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { RootState, persistor } from "@/redux/store";
import Modal from "../Modal";

const Layout = ({ children }: { children: ReactNode }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     // Dispatch các action để clear store của Redux
  //     // Xóa dữ liệu trong Redux Persist
  //     persistor.purge();
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [dispatch]);
  const { isOpenModal } = useSelector((state: RootState) => state.modal);
  return (
    <div className="min-h-screen font-sans antialiased ">
      <Header />
      {isOpenModal && <Modal />}
      <div className={`mt-10 ${isOpenModal ? "blur" : ""}`}>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
