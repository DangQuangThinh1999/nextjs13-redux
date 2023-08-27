import { setQueryParam } from "@/redux/slice/productSlice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

interface IHref {
  pathname: string;
  query: any;
}
const navigation = [
  {
    name: "product",
    href: {
      pathname: "/products",
      query: {
        searchTerm: "",
        page: 1,
        sortType: "asc",
        sortBy: "name",
        active: true,
      },
    },
  },
  { name: "blog", href: "/blog" },
  { name: "profile", href: "/profile" },
  { name: "settings", href: "/settings" },
];

export const Nav = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const dispatch = useDispatch();
  const handleClick = (href: string | IHref) => {
    if (typeof href === "string") router.push(href);
    else {
      dispatch(
        setQueryParam({
          queryParameters: {
            searchTerm: "",
            page: 1,
            sortType: "asc",
            sortBy: "name",
            active: true,
          },
        })
      );

      router.push(href.pathname, href.query);
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
