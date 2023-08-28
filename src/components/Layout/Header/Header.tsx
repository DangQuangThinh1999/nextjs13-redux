import { useState } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

import { Nav } from "./Nav";
import CustomButton from "@/components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slice/authSlice";

import Image from "next/image";
import icon from "@/assets/icon.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Background from "../Background";
import { hasCookie } from "@/utils/api";
const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {  user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();
  const pathName = usePathname();
  const isShowButtonLogin = pathName.includes("login");
  const cookieExists = hasCookie('access_token');

  return (
    <div className="bg-white">
      <header className="fixed backdrop-blur-2xl inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1 ">
            <Link
              href="/"
              className="-m-1.5 p-1.5 flex justify-center items-center space-x-4"
            >
              <span className="sr-only">Your Company</span>
              <Image src={icon} width={50} height={50} alt="bitcoin" />
              <p>NEXT SHOPPING</p>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {cookieExists && <Nav />}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-3">
            {cookieExists && (
              <p className="flex items-center font-bold">
                Hi {user?.username} !
              </p>
            )}

            {cookieExists ? (
              <CustomButton
                text={"Logout"}
                onClick={() => dispatch(logout())}
              />
            ) : !isShowButtonLogin ? (
              <CustomButton text={"Login"} link={"/auth/login"} />
            ) : (
              <CustomButton text={"Register"} link={"/auth/register"} />
            )}
          </div>
        </nav>
        <div
          className="lg:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
        >
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <CustomButton text={"Login"} link={"auth/login"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Background />
    </div>
  );
}
