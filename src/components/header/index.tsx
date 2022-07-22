import { Logo } from "components/logo";
import { NavigationMenu } from "components/navigation";
import { useState } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

export const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 shadow">
      <div>
        <nav className="bg-light">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between h-16">
              <div className=" flex items-center">
                <a className="flex-shrink-0 mr-3 flex-none h-[45px]" href="/">
                  <Logo />
                </a>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <non-mobile-nav-menu>
                      <NavigationMenu />
                    </non-mobile-nav-menu>
                  </div>
                </div>
              </div>
              <div className="block">
                <div className="ml-4 flex items-center md:ml-6"></div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={handleMenuToggle}
                  className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 md:hidden">
            {isMenuOpen && (
              <mobile-nav-menu>
                <NavigationMenu isMobile />
              </mobile-nav-menu>
            )}
          </div>
        </nav>
      </div>
    </nav>
  );
};
