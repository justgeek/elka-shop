import Link from "next/link";
import { useRouter } from "next/router";
import { useCart } from "pages/cart/store/cart.context";
import { FunctionComponent } from "react";
import { AppRoute, ROUTES } from "src/routes";

interface Props {
  isMobile?: boolean;
}

export const NavigationMenu: FunctionComponent<Props> = ({ isMobile }) => {
  const router = useRouter();

  const isRouteActive = (route: AppRoute) => {
    return router.pathname == route.path;
  };

  const {
    state: { totalCartItemsCount: totalCartItemsCount, cart },
  } = useCart()!;

  return (
    <>
      {Object.values(ROUTES).map((route: AppRoute) => {
        const { name, path, navigationLabel } = route;
        const shouldShowCartCount = route.name === "cart" && totalCartItemsCount > 0;
        return (
          <Link href={path} key={name}>
            <a
              className={`relative text-gray-300  hover:text-gray-800  px-3 py-2 rounded-md ${
                isMobile ? "text-center block" : "text-md"
              } font-medium ${isRouteActive(route) ? "text-active" : ""}`}>
              {navigationLabel}
              {shouldShowCartCount && (
                <span className="flex absolute w-5 h-5 -right-2.5 top-1 justify-center items-center rounded-full text-white bg-red-500 text-xs">
                  <span className="p-1">{totalCartItemsCount}</span>
                </span>
              )}
            </a>
          </Link>
        );
      })}
    </>
  );
};
