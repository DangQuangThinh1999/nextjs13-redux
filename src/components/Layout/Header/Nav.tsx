import { setQueryParam, setResultItems } from "@/redux/slice/productSlice";
import { RootState } from "@/redux/store";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface IHref {
  pathname: string;
  query: any;
}
const navigation = [
  {
    name: "product",
    href: "products?searchTerm=&page=1&sortType=asc&sortBy=name&active=true",
  },
  { name: "blog", href: "/blog" },
  { name: "profile", href: "/profile" },
  { name: "settings", href: "/settings" },
];

export const Nav = () => {
  const router = useRouter();
  const { queryParameters } = useSelector((state: RootState) => state.product);
  const pathName = usePathname();

  const dispatch = useDispatch();
  const handleClick = (href: string | IHref) => {
    if (typeof href === "string") {
      router.push(href);
      if (href.includes("products")) {
        dispatch(
          setResultItems({ queryParameters: queryParameters, resultItems: [] })
        );
      }
    }
  };
  return (
    <div className="hidden lg:flex lg:gap-x-12">
      {navigation.map((item) => (
        <button
          onClick={() => handleClick(item.href)}
          key={item.name}
          className={
            "hover:text-[#9333EA]" +
            (pathName.includes(item.name) ? " color-primary" : " ")
          }
        >
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </button>
      ))}
    </div>
  );
};
